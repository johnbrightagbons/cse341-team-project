const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { getAllDetails, getStudentDetails, createDetails, updateDetails, deleteDetails } = require('../controllers/academicDetails');




router.get('/', isAuthenticated, getAllDetails);
router.get('/:id', isAuthenticated, getStudentDetails);
router.post('/', isAuthenticated, createDetails);
router.put('/:id', isAuthenticated, updateDetails);
router.delete('/:id', isAuthenticated, deleteDetails);


module.exports = router;
