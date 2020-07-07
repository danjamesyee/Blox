const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTracksInput(data) {
  const errors = {};

  data.title = validText(data.title) ? data.title : '';

  // title must not be empty
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  // title must be between 3 and 50 chars
  if (!Validator.isLength(data.title, { min: 3, max: 50 })) {
    errors.title = "Title must be between 3 and 50 chars";
  }

  // validate blocks array is not empty
  if (data.blocks.length === 0) {
    errors.blocks = "Track must not be empty";
  }

  // validate blocks array does not exceed 100 items
  if (data.blocks.length >= 100) {
    errors.blocks = "Too many blocks";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}