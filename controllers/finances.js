const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const { validationResult } = require('express-validator');

const getAllFinances = async (req, res, next) => {
    try {
        const db = mongodb.getDatabase();
        const finances = await db.collection('finances').find().toArray();
        res.status(200).json(finances);
    } catch (err) {
        next(err);
    }
};

const getFinances = async (req, res, next) => {
    try {
        const financeId = req.params.id;
        console.log('Requested Finance ID:', financeId);

        // Check if the ID is a valid ObjectId
        if (!ObjectId.isValid(financeId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const db = mongodb.getDatabase();
        const finances = await db.collection('finances').findOne({ _id: new ObjectId(financeId) });

        if (!finances) {
            console.log('Financial record not found');
            return res.status(404).json({ message: 'Financial record not found' });
        }

        console.log('Found Financial record:', finances);
        res.status(200).json(finances);
    } catch (err) {
        next(err);
    }
};


const createFinances = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const finances = {
        tuitionBalance: req.body.tuitionBalance,
        scholarships: req.body.scholarships,
        paymentStatus: req.body.paymentStatus
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('finances').insertOne(finances);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...finances });
        } else {
            res.status(500).json({ message: "Error creating financial record" });
        }
    } catch (err) {
        next(err);
    }
};

const updateFinances = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const financeId = new ObjectId(id);
    const updatedFinances = {
        tuitionBalance: req.body.tuitionBalance,
        scholarships: req.body.scholarships,
        paymentStatus: req.body.paymentStatus
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('finances').updateOne(
            { _id: financeId },
            { $set: updatedFinances }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Financial record not found or no changes made" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteFinances = async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const financeId = new ObjectId(id);
        const db = mongodb.getDatabase();
        const response = await db.collection('finances').deleteOne({ _id: financeId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Financial record not found" });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllFinances,
    getFinances,
    createFinances,
    updateFinances,
    deleteFinances
};
