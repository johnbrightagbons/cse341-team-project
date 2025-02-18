const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import validators
const { isAuthenticated } = require('../middleware/authenticate');
const { getAllFinances, getFinances, createFinances, updateFinances, deleteFinances } = require('../controllers/finances');
const { validateFinances, handleValidationErrors } = require('../middleware/validate');

// Middleware to validate MongoDB ObjectId for routes with ':id'
const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];


router.get('/', getAllFinances);
router.get('/:id',validateId, getFinances);
router.post('/',validateFinances,handleValidationErrors ,isAuthenticated,createFinances);
router.put('/:id',validateId,handleValidationErrors,isAuthenticated, updateFinances);
router.delete('/:id',validateId,isAuthenticated, deleteFinances);


module.exports = router;
