export class AppException extends Error {
  constructor(
    public readonly message: string,
    public readonly responseId?: string | null,
    public readonly statusCode?: number
  ) {
    super(message);
  }
}
