const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');


const getAllClassInfo= async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const classInfo = await db.collection('class').find().toArray();
        res.status(200).json(classInfo);
    } catch (err) {
        next(err);
    }
};

const getClassInfo = async (req, res, next) => {
    try {
        const classId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const order = await db.collection('class').findOne({ _id: classId });

        if (!order) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

const createClassInfo  = async (req, res, next) => {

    const classInfo = {
        currentCourses: req.body.currrentCourses,
        completedCourses: req.body.completedCourses,
        creditsEarned: req.body.creditsEarned,
        academicStanding: req.body.academicStanding
        
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('class').insertOne(classInfo);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...classInfo });
        } else {
            res.status(500).json({ message: "Error creating class information..." });
        }
    } catch (err) {
        next(err);
    }
};

const updateClassInfo = async (req, res, next) => {
    
    const classId = new ObjectId(req.params.id);
    const updateClassInfo = {
        currentCourses: req.body.currrentCourses,
        completedCourses: req.body.completedCourses,
        creditsEarned: req.body.creditsEarned,
        academicStanding: req.body.academicStanding
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('class').updateOne({ _id: classId }, { $set: updateClassInfo });

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
        const response = await db.collection('class').deleteOne({ _id: classId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Class  not found." });
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
}