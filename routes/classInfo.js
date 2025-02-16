const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { getAllClassInfo, getClassInfo, createClassInfo, updateClassInfo, deleteClassInfo } = require('../controllers/classInfo');





router.get('/', isAuthenticated, getAllClassInfo);
router.get('/:id', isAuthenticated, getClassInfo);
router.post('/', isAuthenticated, createClassInfo);
router.put('/:id', isAuthenticated, updateClassInfo);
router.delete('/:id', isAuthenticated, deleteClassInfo);


module.exports = router;
