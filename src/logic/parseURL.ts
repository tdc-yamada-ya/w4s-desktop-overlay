export const parseURL = (s: string): {url?: URL; valid: boolean} => {
  try {
    return {
      url: new URL(s),
      valid: true,
    };
  } catch (e) {
    return {
      valid: false,
    };
  }
};
