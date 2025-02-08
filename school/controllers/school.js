const express = require('express');
const School = require('../models/student'); // Import the Student model
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = express.Router(); // Create a new router object

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


router.get('/', async (req, res) => {
    try {
        const school = await Student.find(); // Fetch all students from the database
        res.json(school); // Send the students as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }
});

// Get one student by ID
router.get('/:id', getschool, (req, res) => {
    res.json(res.student); // Send the found student as a JSON response
});

// Create a new student
router.post('/', async (req, res) => {
    const school = new school({
        name: req.body.name, // Set the student's name from the request body
        location: req.body.location, // Set the student's age from the request body
        district: req.body.destrict // Set the student's grade from the request body
    });

    try {
        const school = await school.save(); // Save the new student to the database
        res.status(201).json(newSchool); // Send the created student as a JSON response with a 201 status
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 error if something goes wrong
    }
});


// Update an existing student by ID
router.patch('/:id', getSchool, async (req, res) => {
    if (req.body.name != null) {
        res.school.name = req.body.name; // Update the student's name if provided
    }
    if (req.body.location != null) {
        res.school.location = req.body.age; // Update the student's age if provided
    }
    if (req.body.district != null) {
        res.student.district = req.body.grade; // Update the student's grade if provided
    }

    try {
        const updatedSchool = await res.student.save(); // Save the updated student to the database
        res.json(updatedSchool); // Send the updated student as a JSON response
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 error if something goes wrong
    }
});

// Delete a student by ID
router.delete('/:id', getSchool, async (req, res) => {
    try {
        await res.school.remove(); // Remove the student from the database
        res.json({ message: 'Deleted School' }); // Send a success message as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }
});

// Middleware function to get a student by ID
async function getStudent(req, res, next) {
    let school;
    try {
        student = await School.findById(req.params.id); // Find the student by ID
        if (school == null) {
            return res.status(404).json({ message: 'Cannot find student' }); // Send a 404 error if the student is not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Send a 500 error if something goes wrong
    }

    res.student = school; // Attach the found student to the response object
    next(); // Move to the next middleware or route handler
}

module.exports = router; // Export the router object