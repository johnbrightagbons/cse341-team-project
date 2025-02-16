const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/students');




router.get('/', isAuthenticated, getAllStudents);
router.get('/:id', isAuthenticated, getStudent);
router.post('/', isAuthenticated, createStudent);
router.put('/:id', isAuthenticated, updateStudent);
router.delete('/:id', isAuthenticated, deleteStudent);


module.exports = router;
