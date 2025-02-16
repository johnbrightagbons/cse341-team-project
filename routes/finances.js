const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const { getAllFinances, getFinances, createFinances, updateFinances, deleteFinances } = require('../controllers/finances');




router.get('/', isAuthenticated, getAllFinances);
router.get('/:id', isAuthenticated, getFinances);
router.post('/', isAuthenticated, createFinances);
router.put('/:id', isAuthenticated, updateFinances);
router.delete('/:id', isAuthenticated, deleteFinances);


module.exports = router;
