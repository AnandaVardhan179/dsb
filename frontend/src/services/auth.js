// src/services/auth.js

export const defaultUsername = "user123";
export const defaultPassword = "password123";

export const authenticate = (username, password) => {
  return username === defaultUsername && password === defaultPassword;
};
