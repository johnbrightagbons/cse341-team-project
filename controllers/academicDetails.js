const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const { validationResult} = require('express-validator');

const getAllDetails = async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const academicDetails = await db.collection('academicDetails').find().toArray();
        res.status(200).json(academicDetails);
    } catch (err) {
        next(err);
    }
};

const getStudentDetails = async (req, res, next) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const details = await db.collection('academicDetails').findOne({ _id: studentId });

        if (!details) {
            return res.status(404).json({ message: 'Details not found' });
        }

        res.status(200).json(details);
    } catch (err) {
        next(err);
    }
};

const createDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const details = {
        major: req.body.major,
        minor: req.body.minor,
        faculty: req.body.faculty,
        gpa: req.body.gpa,
        enrollmentStatus: req.body.enrollmentStatus,
        admissionDate: req.body.admissionDate
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('academicDetails').insertOne(details);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...details });
        } else {
            res.status(500).json({ message: "Error creating academic details" });
        }
    } catch (err) {
        next(err);
    }
};

const updateDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }  

    const studentId = new ObjectId(req.params.id);
    const updatedDetails = {
        major: req.body.major,
        minor: req.body.minor,
        faculty: req.body.faculty,
        gpa: req.body.gpa,
        enrollmentStatus: req.body.enrollmentStatus,
        admissionDate: req.body.admissionDate
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('academicDetails').updateOne(
            { _id: studentId },
            { $set: updatedDetails }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Details not found or no changes made" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteDetails = async (req, res, next) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const response = await db.collection('academicDetails').deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Details not found" });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllDetails,
    getStudentDetails,
    createDetails,
    updateDetails,
    deleteDetails
};
