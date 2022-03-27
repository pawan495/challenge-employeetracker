
const mysql = require("mysql2");
require("dotenv").config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
},
    console.log(`Connected to the inventory_db database.`)
);

connection.connect(function(err){
    if (err) throw err;
});

module.exports = connection;