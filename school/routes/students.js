const express = require('express');
const { getAllStudents, getOneStudent, addStudent } = require('../controllers/students');

const router = express.Router();

// Define the routes and associate them with the controller functions
router.get('/', getAllStudents);
router.get('/:id', getOneStudent);
router.post('/', addStudent);

module.exports = router;