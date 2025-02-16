const express = require('express');
const router = express.Router();
//const { isAuthenticated } = require('../middleware/authenticate');
const { getAllDetails, getStudentDetails, createDetails, updateDetails, deleteDetails } = require('../controllers/academicDetails');




router.get('/',  getAllDetails);
router.get('/:id',  getStudentDetails);
router.post('/',  createDetails);
router.put('/:id',  updateDetails);
router.delete('/:id',  deleteDetails);


module.exports = router;
