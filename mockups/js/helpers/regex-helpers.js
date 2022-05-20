export const REGEX_STRING = /^[ a-zñÑáÁéÉíÍóÓúÚüÜ]+$/i;
export const REGEX_RAZON_SOCIAL = /^[ -.,0-9a-zñÑáÁéÉíÍóÓúÚüÜ]+$/i;
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const REGEX_URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
export const REGEX_NUMBER = /^(-?\d+(\,\d+)?)$/;
export const REGEX_LAT_LNG = /^(-?\d+(\.\d+)?)$/;
export const REGEX_TELEFONO = /^\+?[-0-9 ]+$/;
export const REGEX_REDES = /^[a-z0-9_]+$/i;
