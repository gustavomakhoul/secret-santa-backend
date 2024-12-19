export function formatPhoneNumber(phone: string): string {
  return `${phone}@c.us`;
}

export function validatePhoneNumber(phone: string): boolean {
  return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
}