const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const { validateFinances, handleValidationErrors } = require('../middleware/validate');

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
        const financeId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const finances = await db.collection('finances').findOne({ _id: financeId });

        if (!finances) {
            return res.status(404).json({ message: 'Financial record not found' });
        }

        res.status(200).json(finances);
    } catch (err) {
        next(err);
    }
};

const createFinances = async (req, res, next) => {
    // Validate input
    await Promise.all(validateFinances.map(validation => validation.run(req)));
    handleValidationErrors(req, res, next);

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
    // Validate input
    await Promise.all(validateFinances.map(validation => validation.run(req)));
    handleValidationErrors(req, res, next);

    const financeId = new ObjectId(req.params.id);
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
    try {
        const financeId = new ObjectId(req.params.id);
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
