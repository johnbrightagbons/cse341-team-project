const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import validators
//const { isAuthenticated } = require('../middleware/authenticate');
const { getAllClassInfo, getClassInfo, createClassInfo, updateClassInfo, deleteClassInfo } = require('../controllers/classInfo');
const { validateClassInfo, handleValidationErrors } = require('../middleware/validate');

// Middleware to validate MongoDB ObjectId for routes with ':id'
const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];


router.get('/', getAllClassInfo);
router.get('/:id',validateId, getClassInfo);
router.post('/',validateClassInfo,handleValidationErrors ,createClassInfo);
router.put('/:id',validateId,handleValidationErrors, updateClassInfo);
router.delete('/:id',validateId, deleteClassInfo);


module.exports = router;
