const express = require('express');
const router = express.Router();
const { getAllFinances, getFinances, createFinances, updateFinances, deleteFinances } = require('../controller/finaces');



router.get('/', getAllFinances);
router.get('/:id', getFinances);
router.post('/', createFinances);
router.put('/:id', updateFinances);
router.delete('/:id', deleteFinances);