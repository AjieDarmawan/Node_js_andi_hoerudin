// get the client
// const mysql = require('mysql2');
 
// // create the connection to database
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node_student'
// });

 
// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'node_tutor',
  'root',
  '',
  {
    dialect:'mysql',
   host:'localhost'
  });

  module.exports = sequelize; 

// const session = require('express-session')
// const SessionStore = require('express-session-sequelize')(session.Store)
// const sequelize = new Sequelize(`${process.env.namedatabase}`, `${process.env.dbusername}`, ``, {
//     dialect: `${process.env.dbengine}`,
//     host: `${process.env.dbhost}`
// });
// const sequelizeSessionStore = new SessionStore({
//     db: sequelize,
// });

// module.exports = {
//     sequelize,
//     sequelizeSessionStore
// }
