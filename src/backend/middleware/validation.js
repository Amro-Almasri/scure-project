const { validateRegistration, sanitizeInput } = require('../utils/validation');

const validateRegisterInput = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Sanitize inputs
  req.body.username = sanitizeInput(username);
  req.body.email = sanitizeInput(email);

  // Validate
  const validation = validateRegistration(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }

  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  req.body.email = sanitizeInput(email);

  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
