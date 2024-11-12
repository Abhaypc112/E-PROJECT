const {body,validationResult} = require('express-validator');

// User address validation
const userAddsVali = [
    body('fullName').not().isEmpty().withMessage('Fullname required !'),
    body('phone').not().isEmpty().withMessage('Phone number required !'),
    body('address').not().isEmpty().withMessage('Address required !'),
    body('pincode').isLength({min:6}).withMessage('Must be 6 char !'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = userAddsVali;