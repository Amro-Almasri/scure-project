const express = require('express');
const { register, login, getCurrentUser, getAllUsers, deleteUser } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validateRegisterInput, validateLoginInput } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

// Admin routes
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
