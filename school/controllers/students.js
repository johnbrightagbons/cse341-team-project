const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');


const getAllStudents= async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const orders = await db.collection('students').find().toArray();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

const getStudent = async (req, res, next) => {
    try {
        const studentIdId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const student = await db.collection('students').findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ message: 'Student  not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

const createStudent  = async (req, res, next) => {

    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateofBirth,
        gender: req.body.gender,
        physicalAddress: req.body.physicalAddress,
        phone: req.body.phone,
        email: req.body.email
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('students').insertOne(order);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...student });
        } else {
            res.status(500).json({ message: "Error creating a student..." });
        }
    } catch (err) {
        next(err);
    }
};

const updateStudent = async (req, res, next) => {
    
    const studentId = new ObjectId(req.params.id);
    const updateStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateofBirth,
        gender: req.body.gender,
        physicalAddress: req.body.physicalAddress,
        phone: req.body.phone,
        email: req.body.email
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('students').updateOne({ _id: studentId }, { $set: updateStudent });

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
            res.status(404).json({ message: "Student not found." });
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