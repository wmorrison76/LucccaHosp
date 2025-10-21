// File: src/components/EchoCore/utils/encryption.js
export const encryptData = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return text;
  }
};

export const decryptData = (text) => {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch {
    return text;
  }
};