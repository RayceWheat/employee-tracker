const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const firstPromt = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: [
                'View all departments', 
                'View all Roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee'],
            filter(val) {
                return val.toLowerCase();
            },
        },
    ])
    .then((answers) => {

        if (answers.userChoice === 'view all departments') {
            // making a raw SQL query to our database
            db.query(
                'SELECT * FROM departments',
                function(err, results, fields) {
                    // using table to display 
                    console.table(results);
                });
        } else if (answers.userChoice === 'view all roles'){
            // making a raw SQL query to our database
            db.query(
                'SELECT * FROM roles',
                function(err, results, fields) {
                    // using table to display 
                    console.table(results);
                });
        } else if (answers.userChoice === 'view all employees'){
            // making a raw SQL query to our database
            db.query(
                'SELECT * FROM employees',
                function(err, results, fields) {
                    // using table to display 
                    console.table(results);
                });
        } else if (answers.userChoice === 'add department') {
            inquirer.prompt([
                {
                type: 'input',
                name: 'newDepartment',
                message: 'What is the name of the department you wish to add?'
                }])
            .then(answer => {
                db.query(
                    `INSERT INTO departments (name) VALUES ('${answer.newDepartment}');`,
                    );
                db.query(
                        'SELECT * FROM departments',
                        function(err, results, fields) {
                            // using table to display 
                            console.table(results);
                });
            });
        };
    })
};

firstPromt();