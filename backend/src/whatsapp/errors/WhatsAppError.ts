export class WhatsAppError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'WhatsAppError';
  }
}