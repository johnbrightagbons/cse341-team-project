const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');


const getAllFinances= async (req, res, next) => {
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
        const order = await db.collection('finance').findOne({ _id: financeId });

        if (!order) {
            return res.status(404).json({ message: 'Financial record not found' });
        }

        res.status(200).json(finances);
    } catch (err) {
        next(err);
    }
};

const createFinances  = async (req, res, next) => {

    const finances = {
        tuitionBalance: req.body.tuitionBalance,
        scholarships: req.body.scholarships,
        paymentStatus: req.body.paymentStatus
         
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('finance').insertOne(finances);

        if (response.acknowledged) {
            res.status(201).json({ _id: response.insertedId, ...finances });
        } else {
            res.status(500).json({ message: "Error creating financial record..." });
        }
    } catch (err) {
        next(err);
    }
};

const updateFinances = async (req, res, next) => {
    
    const financeId = new ObjectId(req.params.id);
    const updateFinances = {
        tuitionBalance: req.body.tuitionBalance,
        scholarships: req.body.scholarships,
        paymentStatus: req.body.paymentStatus
    };

    try {
        const db = mongodb.getDatabase();
        const response = await db.collection('finance').updateOne({ _id: financeId }, { $set: updateFinances });

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
        const response = await db.collection('finance').deleteOne({ _id: financeId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Financial Record  not found." });
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
}