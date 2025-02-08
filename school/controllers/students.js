const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

// Controller function to get all students
const getAllStudents = async (req, res) => {
    try {
        const list = await getDb().collection('students').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list); // Return list of students
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to get one student by ID
const getOneStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await getDb().collection('students').findOne({ _id: new ObjectId(studentId) });
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller function to add a new student
const addStudent = async (req, res) => {
    try {
        const newStudent = req.body;
        const result = await getDb().collection('students').insertOne(newStudent);
        res.status(201).json(result.ops[0]); // Return the created student
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllStudents,
    getOneStudent,
    addStudent,
};