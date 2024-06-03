const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router