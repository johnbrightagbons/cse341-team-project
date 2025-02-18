const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import validators
const { 
  validateAcademicDetails,
  handleValidationErrors 
} = require('../validation'); // Import validation middleware
//const { isAuthenticated } = require('../middleware/authenticate');
const { getAllDetails, getStudentDetails, createDetails, updateDetails, deleteDetails } = require('../controllers/academicDetails');

// Middleware to validate MongoDB ObjectId for routes with ':id'
const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    handleValidationErrors
  ];


router.get('/',  getAllDetails);
router.get('/:id',validateId,  getStudentDetails);
router.post('/',validateAcademicDetails,handleValidationErrors , createDetails);
router.put('/:id',validateId,handleValidationErrors,  updateDetails);
router.delete('/:id',validateId,  deleteDetails);


module.exports = router;
