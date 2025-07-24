import { Controller, useForm } from 'react-hook-form';
import type { CreateTheme } from '@/features/themes/interfaces/create-theme.interface.ts';
import { createThemeSchema } from '@/features/themes/interfaces/create-theme.interface.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, HStack, IconButton, Input, Stack } from '@chakra-ui/react';
import { ThemeInput } from '@/features/themes/components/ThemeInput.tsx';
import { useCreateThemeMutation } from '@/features/themes/themesApiSlice.ts';
import { MdAdd } from 'react-icons/md';
import { useEffect } from 'react';
import { useCallbackStable } from '@/app/hooks/use-callback-stable.ts';

export type ThemeFormProps = {
  onSuccessful?: () => void;
  selectPortal?: boolean;
  defaultTheme?: CreateTheme;
};

export function ThemeForm({
  onSuccessful,
  selectPortal = true,
  defaultTheme,
}: ThemeFormProps) {
  const { register, handleSubmit, reset, control } = useForm<CreateTheme>({
    resolver: zodResolver(createThemeSchema),
    defaultValues: defaultTheme,
  });
  const [createTheme, { isLoading, isError, error, isSuccess }] =
    useCreateThemeMutation();
  const handleSuccessful = useCallbackStable(() => {
    reset();
    onSuccessful?.();
  });
  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) handleSuccessful();
  }, [isSuccess, handleSuccessful]);
  return (
    <form onSubmit={handleSubmit(createTheme)}>
      <HStack gap={4} borderWidth={1} p={4} borderRadius={2}>
        <Stack>
          <Field.Root required>
            <Field.Label>Тема заметки</Field.Label>
            <Input placeholder={'Тема'} {...register('name')} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Родительская тема</Field.Label>
            <Controller
              render={({ field: { name, value, onChange, onBlur } }) => (
                <ThemeInput
                  name={name}
                  value={[String(value)]}
                  onValueChange={e => {
                    const val = e.value.at(0);
                    onChange(val ? +val : undefined);
                  }}
                  onInteractOutside={onBlur}
                  selectPortal={selectPortal}
                  allowThemeCreate={false}
                />
              )}
              name={'parentId'}
              control={control}
            />
          </Field.Root>
        </Stack>
        <IconButton
          alignSelf={'stretch'}
          h={'auto'}
          type={'submit'}
          loading={isLoading}
          aria-label={'Создать тему'}
        >
          <MdAdd />
        </IconButton>
      </HStack>
    </form>
  );
}
