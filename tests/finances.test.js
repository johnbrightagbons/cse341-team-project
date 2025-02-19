const request = require('supertest');  // Supertest helps to send HTTP requests
const app = require('../server');      // Import your Express app

jest.mock('../data/database'); // Mock the database module to prevent actual DB calls
const mongodb = require('../data/database');

// Mock the getDatabase function to return a fake collection
const mockCollection = {
    find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([
            { _id: "6507f3b7a1b2c3d4e5f6g7h8", tuitionBalance: 1000, scholarships: 500, paymentStatus: "Paid" }
        ])
    }),
    findOne: jest.fn().mockImplementation((query) => {
        if (query._id.toString() === "6507f3b7a1b2c3d4e5f6g7h8") {
            return Promise.resolve({ _id: "6507f3b7a1b2c3d4e5f6g7h8", tuitionBalance: 1000, scholarships: 500, paymentStatus: "Paid" });
        }
        return Promise.resolve(null);
    })
};

mongodb.getDatabase.mockReturnValue({
    collection: () => mockCollection
});

// TESTING getAllFinances
describe("GET /finances", () => {
    it("should return all financial records", async () => {
        const res = await request(app).get('/finances');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { _id: "6507f3b7a1b2c3d4e5f6g7h8", tuitionBalance: 1000, scholarships: 500, paymentStatus: "Paid" }
        ]);
    });
});

// TESTING getFinances (by ID)
describe("GET /finances/:id", () => {
    it("should return a single financial record if found", async () => {
        const res = await request(app).get('/finances/6507f3b7a1b2c3d4e5f6g7h8');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            _id: "6507f3b7a1b2c3d4e5f6g7h8",
            tuitionBalance: 1000,
            scholarships: 500,
            paymentStatus: "Paid"
        });
    });

    it("should return 404 if the financial record is not found", async () => {
        const res = await request(app).get('/finances/invalidID');

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: "Financial record not found" });
    });
});
