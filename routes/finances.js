const express = require('express');
const router = express.Router();
const { getAllFinances, getFinances, createFinances, updateFinances, deleteFinances } = require('../controllers/finances');



router.get('/', getAllFinances);
router.get('/:id', getFinances);
router.post('/', createFinances);
router.put('/:id', updateFinances);
router.delete('/:id', deleteFinances);

module.exports = router;