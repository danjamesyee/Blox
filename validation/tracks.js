module.exports = function validateTracksInput(blocks) {
  const errors = {};

  // validate blocks array is not empty
  if (blocks.length === 0) {
    errors.blocks = "Track must not be empty.";
  }

  // validate blocks array does not exceed 100 items
  if (blocks.length >= 100) {
    errors.blocks = "Too many blocks."
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}