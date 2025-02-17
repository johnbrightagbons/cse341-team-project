const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const { validationResult} = require('express-validator');


const getAllClassInfo = async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const classInfo = await db.collection('classInfo').find().toArray();
        res.status(200).json(classInfo);
    } catch (err) {
        next(err);
    }
};

const getClassInfo = async (req, res, next) => {
    try {
        const classId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const classInfo = await db.collection('classInfo').findOne({ _id: classId });

        if (!classInfo) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(classInfo);
    } catch (err) {
        next(err);
    }
};

const createClassInfo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const classInfo = {
        currentCourses: req.body.currentCourses,
        completedCourses: req.body.completedCourses,
        creditsEarned: req.body.creditsEarned,
        academicStanding: req.body.academicStanding
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('classInfo').insertOne(classInfo);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...classInfo });
        } else {
            res.status(500).json({ message: "Error creating class information" });
        }
    } catch (err) {
        next(err);
    }
};

const updateClassInfo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const classId = new ObjectId(req.params.id);
    const updatedClassInfo = {
        currentCourses: req.body.currentCourses,
        completedCourses: req.body.completedCourses,
        creditsEarned: req.body.creditsEarned,
        academicStanding: req.body.academicStanding
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('classInfo').updateOne(
            { _id: classId },
            { $set: updatedClassInfo }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Class Info not found or no changes made" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteClassInfo = async (req, res, next) => {
    try {
        const classId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const response = await db.collection('classInfo').deleteOne({ _id: classId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Class not found" });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllClassInfo,
    getClassInfo,
    createClassInfo,
    updateClassInfo,
    deleteClassInfo
};
