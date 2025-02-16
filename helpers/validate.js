const { body, validationResult } = require('express-validator');

// Student validation rules
const validateStudent = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').isDate().withMessage('Invalid date of birth'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('physicalAddress').notEmpty().withMessage('Address is required'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('email').isEmail().withMessage('Invalid email address')
];

// Class Info validation rules
const validateClassInfo = [
    body('className').notEmpty().withMessage('Class name is required'),
    body('teacher').notEmpty().withMessage('Teacher name is required'),
    body('schedule').notEmpty().withMessage('Schedule is required')
];

// Academic Details validation rules  
const validateAcademicDetails = [
    body('studentId').isMongoId().withMessage('Invalid student ID'),
    body('gpa').isFloat({ min: 0, max: 4 }).withMessage('Invalid GPA'),
    body('attendance').isFloat({ min: 0, max: 100 }).withMessage('Invalid attendance percentage')
];

// Finances validation rules
const validateFinances = [
    body('studentId').isMongoId().withMessage('Invalid student ID'),
    body('balance').isFloat().withMessage('Invalid balance amount'),
    body('lastPaymentDate').optional().isDate().withMessage('Invalid payment date')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateStudent,
    validateClassInfo,
    validateAcademicDetails,
    validateFinances,
    handleValidationErrors
};
