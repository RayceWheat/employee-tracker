const mysql = require('mysql2');


require('dotenv').config();

// Connect to the databse
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        // find a way to obfuscate this 
        password: process.env.DB_PW,
        database: 'company'
        
    },
    console.log('Connected to the databse')
);

/*
const test = db.query(
    'SELECT * FROM departments',
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);
*/
module.exports = db;