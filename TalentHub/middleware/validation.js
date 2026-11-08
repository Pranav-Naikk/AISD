const { validationResult } = require('express-validator');

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ message: 'Please correct the highlighted values.', errors: errors.array() });
  next();
};
