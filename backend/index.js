const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(err => onslotchange.log(err));