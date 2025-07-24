export class CodeError {
  constructor(
    public readonly code: string,
    public readonly message?: string,
    public readonly statusCode?: number,
    public readonly error?: string,
  ) {}
}
