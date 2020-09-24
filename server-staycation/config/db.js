const sequelize = require('sequelize');

const db = new sequelize('stay_cation_nodejs',"root","",{
    dialect : 'mysql'
});

db.sync({});

module.exports = db;