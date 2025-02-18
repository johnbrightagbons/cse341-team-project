const { body, validationResult } = require('express-validator');

// Student validation rules
const validateStudent = [
  body('firstName')
    .isString().withMessage('First name must be a string')
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .isString().withMessage('Last name must be a string')
    .notEmpty().withMessage('Last name is required'),

  body('dateOfBirth')
    .isDate().withMessage('Date of birth must be a valid date')
    .custom((value) => {
      // Additional check: Ensure the date is not in the future
      if (new Date(value) > new Date()) {
        throw new Error('Date of birth cannot be in the future');
      }
      return true;
    }),

  body('gender')
    .isString().withMessage('Gender must be a string')
    .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be one of "Male", "Female", or "Other"')
    .notEmpty().withMessage('Gender is required'),

  body('physicalAddress')
    .isString().withMessage('Physical address must be a string')
    .notEmpty().withMessage('Physical address is required'),

  body('phone')
    .isString().withMessage('Phone number must be a string')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits long'),

  body('email')
    .isString().withMessage('Email must be a string')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
];





// Class Info validation rules
const validateClassInfo = [
    body('currentCourses')
    .isArray().withMessage('Current Courses must be an array')
    .optional({ checkFalsy: true }) // Optional but must be an array if provided
    .custom((value) => value.every((item) => typeof item === 'string'))
    .withMessage('Each item in Current Courses must be a string'),

  // Check that completedCourses is an array of strings
  body('completedCourses')
    .isArray().withMessage('Completed Courses must be an array')
    .optional({ checkFalsy: true }) // Optional but must be an array if provided
    .custom((value) => value.every((item) => typeof item === 'string'))
    .withMessage('Each item in Completed Courses must be a string'),

  // Check that creditsEarned is a positive integer
  body('creditsEarned')
    .isInt({ min: 0 }).withMessage('Credits Earned must be a non-negative integer')
    .optional(), // Optional if no creditsEarned value is provided

  // Validate academicStanding as a non-empty string
  body('academicStanding')
    .isString().withMessage('Academic Standing must be a valid string')
    .notEmpty().withMessage('Academic Standing cannot be empty')
    .optional(), // Optional if no academicStanding value is provided
];


// Academic Details validation rules  
const validateAcademicDetails = [
    // Check for 'gpa' as a float between 0 and 4
  body('gpa')
  .isFloat({ min: 0, max: 4 }).withMessage('GPA must be a number between 0 and 4'),

// Check 'attendance' as a float between 0 and 100 (adjust if needed)
body('attendance')
  .isFloat({ min: 0, max: 100 }).withMessage('Attendance must be a number between 0 and 100'),

// Ensure 'major', 'minor', 'faculty', and 'enrollmentStatus' are strings (non-empty if needed)
body('major')
  .isString().withMessage('Major must be a valid string')
  .notEmpty().withMessage('Major cannot be empty'),

body('minor')
  .isString().withMessage('Minor must be a valid string')
  .optional(), // Minor can be optional (if no minor is provided, it can be omitted)

body('faculty')
  .isString().withMessage('Faculty must be a valid string')
  .notEmpty().withMessage('Faculty cannot be empty'),

body('enrollmentStatus')
  .isString().withMessage('Enrollment Status must be a valid string')
  .notEmpty().withMessage('Enrollment Status cannot be empty'),

// Check 'admissionDate' format (e.g., YYYY-MM-DD)
body('admissionDate')
  .isDate().withMessage('Admission Date must be a valid date')
  .optional()  // Optional if no admission date is provided
];



// Finances validation rules
const validateFinances = [body('tuitionBalance')
    .isFloat({ min: 0 }).withMessage('Tuition balance must be a non-negative number'),

  body('scholarships')
    .isArray().withMessage('Scholarships must be an array')
    .optional({ checkFalsy: true }) // Optional but must be an array if provided
    .custom((value) => value.every((item) => typeof item === 'string'))
    .withMessage('Each item in Scholarships must be a string'),

  body('paymentStatus')
    .isString().withMessage('Payment Status must be a valid string')
    .notEmpty().withMessage('Payment Status cannot be empty')
    .isIn(['Paid', 'Pending', 'Unpaid']).withMessage('Payment Status must be one of "Paid", "Pending", or "Unpaid"')
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
