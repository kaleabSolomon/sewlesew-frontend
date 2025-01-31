export const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
export const isValidPhone = (value: string) =>
  /^(\+251|0)[1-9]\d{8}$/.test(value);
