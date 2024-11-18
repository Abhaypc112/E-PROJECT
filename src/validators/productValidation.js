const {body,validationResult} = require('express-validator');

// Product validation
const productValidation = [
    body('name').not().isEmpty().withMessage('name required !'),
    body('description').not().isEmpty().withMessage('description required !'),
    body('category').not().isEmpty().withMessage('category required !'),
    body('price').not().isEmpty().withMessage('price required !'),
    body('stock').not().isEmpty().withMessage('stock required !'),
    body('rating').not().isEmpty().withMessage('rating required !'),
    body('material').not().isEmpty().withMessage('material required !'),
    body('images').not().isEmpty().withMessage('Images required !'),
    body('tags').not().isEmpty().withMessage('tags required !'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

module.exports = productValidation;