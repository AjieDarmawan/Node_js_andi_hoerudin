

const Sequelize = require('sequelize');

const sequelize = require('../../utils/db');

 const User = sequelize.define('users',{
     id:{
         type:Sequelize.INTEGER,
         allowNuLL:false,
         autoIncrement:true,
         primaryKey:true
     },
     name:Sequelize.TEXT,
     email: Sequelize.TEXT,
     password: Sequelize.TEXT,
    
})
module.exports=User;