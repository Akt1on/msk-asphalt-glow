export const DEFAULT_PHONE = "+79138263070";
export const DEFAULT_PHONE_DISPLAY = "+7 (913) 826-30-70";
// MAX messenger — use phone-based deep link
export const maxLink = (phone: string) =>
  `https://max.ru/${phone.replace(/[^\d+]/g, "")}`;
export const telLink = (phone: string) =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;
