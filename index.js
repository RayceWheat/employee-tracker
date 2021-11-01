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
                'Update employee role'],
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
                `SELECT roles.id, roles.title, roles.salary, employees.first_name, employees.last_name
                FROM employees
                INNER JOIN roles ON employees.role_id=roles.id`,
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
        } else if (answers.userChoice === 'add role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newTitle',
                    message: 'What is the title of the new role'
                },
                {
                    type: 'number',
                    name: 'newSalary',
                    message: 'What is the Salary'
                },
                {
                    type: 'number',
                    name: 'departmentId',
                    message: 'What is the department ID'
                }
            ])
            .then(answers => {
                db.query(
                    `INSERT INTO roles (title, salary, department_id) 
                    VALUES 
                    ('${answers.newTitle}', ${answers.newSalary}, ${answers.departmentId})`);
                db.query(
                    'SELECT * FROM roles',
                    function(err, results, fields) {
                        // using table to display 
                        console.table(results);
                })
            })
        } else if (answers.userChoice === 'add employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newFirstName',
                    message: 'What is the first name of the new employee'
                },
                {
                    type: 'input',
                    name: 'newLastName',
                    message: 'What is the last name of the new employee'
                },
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'What is the employees role id'
                },
                {
                    type: 'number',
                    name: 'mangagerId',
                    message: 'What is the id of the manager of this employee'
                }
            ])
            .then(answers => {
                db.query(
                    `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                    VALUES 
                    ('${answers.newFirstName}', '${answers.newLastName}', ${answers.roleId}, ${answers.mangagerId})`);
                db.query(
                    'SELECT * FROM employees',
                    function(err, results, fields) {
                        // using table to display 
                        console.table(results);
                })
            })
        } else if (answers.userChoice === "update employee role") {
            inquirer.prompt([
                {
                    type: 'number',
                    name: 'employeeID',
                    message: 'What is the id of the employee?'
                },
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is the new role of this employee?'
                }
            ]).then(answers => {
                db.query(
                    `UPDATE employees
                    SET role_id = ${answers.newRole}
                    WHERE id = ${answers.employeeID}`);
                db.query(
                    `SELECT roles.id, roles.title, roles.salary, employees.first_name, employees.last_name
                    FROM employees
                    INNER JOIN roles ON employees.role_id=roles.id`,
                        function(err, results, fields) {
                            // using table to display 
                            console.table(results);
                });
            })
        }
    })
};

firstPromt();