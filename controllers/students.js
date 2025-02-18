const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const { validationResult } = require('express-validator');


const getAllStudents = async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const students = await db.collection('students').find().toArray();
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
};

const getStudent = async (req, res, next) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const student = await db.collection('students').findOne({ _id: studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

const createStudent = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        physicalAddress: req.body.physicalAddress,
        phone: req.body.phone,
        email: req.body.email
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('students').insertOne(student);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...student });
        } else {
            res.status(500).json({ message: "Error creating a student" });
        }
    } catch (err) {
        next(err);
    }
};

const updateStudent = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

    const studentId = new ObjectId(req.params.id);
    const updatedStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        physicalAddress: req.body.physicalAddress,
        phone: req.body.phone,
        email: req.body.email
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('students').updateOne(
            { _id: studentId },
            { $set: updatedStudent }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Student not found or no changes made" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const response = await db.collection('students').deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
