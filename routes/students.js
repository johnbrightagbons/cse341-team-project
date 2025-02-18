const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import validators
const { validateStudent, handleValidationErrors 
} = require('../middleware/validate');
//const { isAuthenticated } = require('../middleware/authenticate');
const { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/students');

// Middleware to validate MongoDB ObjectId for routes with ':id'
const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    handleValidationErrors
  ];


router.get('/',  getAllStudents);
router.get('/:id',validateId,validateStudent, getStudent);
router.post('/',validateStudent,handleValidationErrors, createStudent);
router.put('/:id',validateId,handleValidationErrors, updateStudent);
router.delete('/:id',validateId, deleteStudent);


module.exports = router;
