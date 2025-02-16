const express = require('express');
const router = express.Router();
//const { isAuthenticated } = require('../middleware/authenticate');
const { getAllClassInfo, getClassInfo, createClassInfo, updateClassInfo, deleteClassInfo } = require('../controllers/classInfo');





router.get('/', getAllClassInfo);
router.get('/:id', getClassInfo);
router.post('/', createClassInfo);
router.put('/:id', updateClassInfo);
router.delete('/:id', deleteClassInfo);


module.exports = router;
