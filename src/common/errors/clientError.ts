export class ClientError extends Error {
  name;

  status?;

  constructor(message: string, status?: number) {
    super(message);

    this.name = 'ClientError';
    this.status = status;
  }
}
