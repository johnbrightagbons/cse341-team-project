const express = require("express");
const { getAllStudents, addStudent } = require("../controllers/school");

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", addStudent);

module.exports = router;
