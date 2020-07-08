const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.text = validText(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 2, max: 150 })) {
        errors.text = 'Comment must be at least 2 and less than 150 chars'
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}