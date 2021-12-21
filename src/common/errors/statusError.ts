export class StatusError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}
