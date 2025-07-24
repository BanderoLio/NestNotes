import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { FindOptionsOrderValue } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ParseSortingPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (
      !value ||
      typeof value !== 'string' ||
      !metatype ||
      !this.toValidate(metatype)
    )
      return undefined;
    const v = value;
    const keys = v.split(',');
    const options: Record<string, FindOptionsOrderValue> = {};
    keys.forEach((key) => {
      if (!key) return;
      if (key[0] === '-') {
        options[key.slice(1)] = 'DESC';
      } else {
        options[key] = 'ASC';
      }
    });
    const obj = plainToInstance(metatype, options) as object;
    const errors = await validate(obj, {
      whitelist: true,
    });
    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints ?? []))
        .flat();
      throw new BadRequestException(
        `Validation failed (sorting): ${messages.join(', ')}`,
      );
    }

    return obj;
  }
  private toValidate(metatype: Type) {
    const types: Type[] = [Number, String, Boolean, Array, Object];
    return !types.includes(metatype);
  }
}
