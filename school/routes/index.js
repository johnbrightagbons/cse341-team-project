const express = require('express');
const router = express.Router();






router.use('/academicDetails', require('./academicDetails'));
router.use('/classInfo', require('./classInfo'));
router.use('/finances', require('./finances'));
router.use('/students', require('./students'));