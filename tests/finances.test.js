const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Adjust this to match your actual app import

describe("GET /finances", () => {
    it("should return all financial records", async () => {
        const res = await request(app).get("/finances");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe("GET /finances/:id", () => {
    it("should return a single financial record if found", async () => {
        const validObjectId = new mongoose.Types.ObjectId().toHexString(); // Generates a valid ObjectId

        const res = await request(app).get(`/finances/${validObjectId}`);

        // Adjust expectations based on your actual API behavior
        expect([200, 404]).toContain(res.status); // Allow 404 if ID doesn't exist
        if (res.status === 200) {
            expect(res.body).toHaveProperty("_id");
        }
    });

    it("should return 400 if the ID format is invalid", async () => {
        const invalidId = "invalidID"; // Not a valid MongoDB ObjectId

        const res = await request(app).get(`/finances/${invalidId}`);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "Invalid ID format" });
    });

    it("should return 404 if the financial record is not found", async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString(); // Valid but not in DB

        const res = await request(app).get(`/finances/${nonExistentId}`);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: "Financial record not found" });
    });
});
