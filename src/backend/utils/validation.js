const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateUsername = (username) => {
  // 3-30 characters, alphanumeric, underscores, hyphens
  return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return validator.escape(input).trim();
};

const validateRegistration = (body) => {
  const errors = [];

  if (!body.username) {
    errors.push('Username is required');
  } else if (!validateUsername(body.username)) {
    errors.push('Username must be 3-30 characters and contain only letters, numbers, underscores, or hyphens');
  }

  if (!body.email) {
    errors.push('Email is required');
  } else if (!validateEmail(body.email)) {
    errors.push('Invalid email format');
  }

  if (!body.password) {
    errors.push('Password is required');
  } else if (!validatePassword(body.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
  }

  if (body.password !== body.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeInput,
  validateRegistration,
};
