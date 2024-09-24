const { body, validationResult } = require("express-validator")

// Middleware for validating book input 
const bookValidationRules = [
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('author').isString().trim().notEmpty().withMessage('Author is required'),
  body('genre').isArray().withMessage('Genre must be an array').bail()
    .custom((arr) => arr.every(genre => typeof genre === 'string' && genre.trim() !== ''))
    .withMessage('Each genre must be a non-empty string'),
  // body('coverImage').isURL().withMessage('Valid cover image URL is required')
];

// Utility to check validation results.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { bookValidationRules, validate };