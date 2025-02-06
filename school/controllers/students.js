const express = require('express');
const Student = require('../models/student'); // Import the Student model
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = express.Router(); // Create a new router object

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


router.get('/', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students from the database
        res.json(students); // Send the students as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }
});

// Get one student by ID
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student); // Send the found student as a JSON response
});

// Create a new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name, // Set the student's name from the request body
        age: req.body.age, // Set the student's age from the request body
        grade: req.body.grade // Set the student's grade from the request body
    });

    try {
        const newStudent = await student.save(); // Save the new student to the database
        res.status(201).json(newStudent); // Send the created student as a JSON response with a 201 status
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 error if something goes wrong
    }
});


// Update an existing student by ID
router.patch('/:id', getStudent, async (req, res) => {
    if (req.body.name != null) {
        res.student.name = req.body.name; // Update the student's name if provided
    }
    if (req.body.age != null) {
        res.student.age = req.body.age; // Update the student's age if provided
    }
    if (req.body.grade != null) {
        res.student.grade = req.body.grade; // Update the student's grade if provided
    }

    try {
        const updatedStudent = await res.student.save(); // Save the updated student to the database
        res.json(updatedStudent); // Send the updated student as a JSON response
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 error if something goes wrong
    }
});

// Delete a student by ID
router.delete('/:id', getStudent, async (req, res) => {
    try {
        await res.student.remove(); // Remove the student from the database
        res.json({ message: 'Deleted Student' }); // Send a success message as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }
});

// Middleware function to get a student by ID
async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id); // Find the student by ID
        if (student == null) {
            return res.status(404).json({ message: 'Cannot find student' }); // Send a 404 error if the student is not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }

    res.student = student; // Attach the found student to the response object
    next(); // Move to the next middleware or route handler
}

module.exports = router; // Export the router object