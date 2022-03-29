// Dependencies
const db = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = function () {
  db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.table(rows);
      userInput();
    });
};


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = function () {
  db.promise()
    .query(`SELECT * FROM role`)
    .then(([rows, fields]) => {
      console.table(rows);
      userInput();
    });
};

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report top:
const viewEmployees = function () {
  db.promise()
    .query(
      `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`
    )
    .then(([rows, fields]) => {
      console.table(rows);
      userInput();
    });
};

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const insertIntoDepartment = function () {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What is the name of the department?",
      validate: (addDept) => {
        if (addDept) {
          return true;
        } else {
          console.log("Please enter a department");
          return false;
        }
      },
    })
    .then((answer) => {
      db.promise()
        .query(
          `INSERT INTO department (name)
        VALUES
        ("${answer.departmentName}")`
        )
        .then(([rows, fields]) => {
          console.log("Department table updated");
          userInput();
        });
    });
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const insertIntoRole = function () {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the title of the new role?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "roleSalary",
        message: "What is the salary of this new role?",
      },
    ])
    .then((answer) => {
      const title = answer.roleTitle;
      const salary = answer.roleSalary;

      db.query(
        `
      SELECT name, id FROM department`,
        (err, data) => {
          if (err) throw err;
          const roleDept = data.map(({ name, id }) => ({
            name: name,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "roleDept",
                message: "Which department does this role belong to?",
                choices: roleDept,
              },
            ])
            .then((deptChoice) => {
              const dept = deptChoice.roleDept;
              db.promise()
                .query(
                  `INSERT INTO role (title, salary, department_id)
              VALUES
              ("${title}", ${salary}, ${dept})`
                )
                .then(([rows, fields]) => {
                  console.log("Roles updated");
                  userInput();
                });
            });
        }
      );
    });
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// This function had some problems so I cleaned it up, when I have time I may add more features and make the other functions like this one
insertIntoEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the employee's first name?",
        validate: (addFirst) => {
          if (addFirst) {
            return true;
          } else {
            console.log("Invalid Response, please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?",
        validate: (addLast) => {
          if (addLast) {
            return true;
          } else {
            console.log("Invalid response, please enter a last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.employeeFirstName, answer.employeeLastName];

      // grab roles from roles table
      const roleSql = `SELECT role.id, role.title FROM role`;

      db.query(roleSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeRole",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.employeeRole;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            db.query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));
              managers.push({
                name: "No Manager",
                value: null,
              });

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  let manager;
                  if (managerChoice.manager === "No Manager") {
                    manager = null;
                  }
                  manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");

                    userInput();
                  });
                });
            });
          });
      });
    });
};

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const alterEmployee = function () {
  db.query(`SELECT * FROM employee`, (err, data) => {
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt({
        type: "list",
        name: "updateEmployeeRole",
        message: "Which employee's role would you like to update?",
        choices: employees,
      })
      .then((answer) => {
        const employeeRoleId = answer;

        db.query(`SELECT * FROM role`, (err, data) => {
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt({
              type: "list",
              name: "role",
              message: "What is the employee's new role?",
              choices: roles,
            })
            .then((answer) => {
              const role = answer.role;

              db.query(
                `UPDATE employee SET role_id = ${role} WHERE id = ${employeeRoleId.updateEmployeeRole}`,
                (err, data) => {
                  console.log("Employee has been updated");
                  userInput();
                }
              );
            });
        });
      });
  });
};

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const userInput = function () {
  return inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "1. View all departments",
        "2. View all roles",
        "3. View all employees",
        "4. Add a department",
        "5. Add a role",
        "6. Add an employee",
        "7. Update an employee role",
        "8. Finish",
      ],
    })
    .then((userChoice) => {
      // View department table
      if (userChoice.options === "1. View all departments") viewDepartments();
      // View role table
      if (userChoice.options === "2. View all roles") viewRoles();
      // View employee table
      if (userChoice.options === "3. View all employees") viewEmployees();
      // Insert value into department table
      if (userChoice.options === "4. Add a department") insertIntoDepartment();
      // Insert value into role table
      if (userChoice.options === "5. Add a role") insertIntoRole();
      // Insert value into employee table
      if (userChoice.options === "6. Add an employee") insertIntoEmployee();
      // Alter employee table
      if (userChoice.options === "7. Update an employee role") alterEmployee();
      // Close connection
      if (userChoice.options === "8. Finish") db.end();
    });
};

userInput();
