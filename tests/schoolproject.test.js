const { getAllDetails } = require('../controllers/academicDetails');
const { getAllClassInfo } = require('../controllers/classInfo');
const { getAllFinances } = require('../controllers/finances');
const { getAllStudents } = require('../controllers/students');
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

jest.mock('../data/database', () => ({
    getDatabase: jest.fn()
}));

describe('Academic Details Controller', () => {
    let req, res, next, mockDb;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        mockDb = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn()
        };
        mongodb.getDatabase.mockReturnValue(mockDb);
    });

    test('getAllDetails should return academic details', async () => {
        const mockData = [{ _id: '1', name: 'John Doe' }];
        mockDb.toArray.mockResolvedValue(mockData);

        await getAllDetails(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
});

describe('Class Info Controller', () => {
    let req, res, next, mockDb;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        mockDb = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn()
        };
        mongodb.getDatabase.mockReturnValue(mockDb);
    });

    test('getAllClassInfo should return class information', async () => {
        const mockData = [{ _id: '1', className: 'Math 101' }];
        mockDb.toArray.mockResolvedValue(mockData);

        await getAllClassInfo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
});

describe('Finances Controller', () => {
    let req, res, next, mockDb;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        mockDb = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn()
        };
        mongodb.getDatabase.mockReturnValue(mockDb);
    });

    test('getAllFinances should return financial records', async () => {
        const mockData = [{ _id: '1', amount: 500 }];
        mockDb.toArray.mockResolvedValue(mockData);

        await getAllFinances(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
});

describe('Students Controller', () => {
    let req, res, next, mockDb;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        mockDb = {
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn()
        };
        mongodb.getDatabase.mockReturnValue(mockDb);
    });

    test('getAllStudents should return student records', async () => {
        const mockData = [{ _id: '1', name: 'Jane Doe' }];
        mockDb.toArray.mockResolvedValue(mockData);

        await getAllStudents(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });
});
