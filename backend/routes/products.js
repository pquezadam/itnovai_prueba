const express = require('express');
const { Op } = require('sequelize');
const Product = require('../models/product');
const Category = require('../models/category');
const { or } = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { category, search, sort_by, order = 'asc', page = 1, per_page = 10 } = req.query;
        const where = {};
        const orderBy = [];

        if (category) {
            where.categoryId = category;
        }
        if (search) {
            where.name = { [Op.like]: `%${search}%` };
        }
        if (sort_by) {
            orderBy.push([sort_by, order]);
        }

        const products = await Product.findAndCountAll({
            where,
            order: orderBy,
            limit: parseInt(per_page),
            offset: (parseInt(page) -1) * parseInt(per_page),
            include: Category
        });

        res.json({
            products: products.rows,
            total: products.count,
            pages: Math.ceil(products.count / per_page),
            current_page: parseInt(page)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;