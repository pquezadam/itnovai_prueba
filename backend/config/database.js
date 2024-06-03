const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('itnovai_test', 'itnovai_test', 'itnovai_test', {
    host: 'itnovai-test.czny55quvxhk.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});

module.exports = sequelize;