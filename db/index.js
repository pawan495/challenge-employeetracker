const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }
//-------view all deaprtment query----
    findAllDepartments(){
        return this.connection.promise().query(
        "select id as dept_id, name as department from department ORDER BY ID ASC;"
        )
    }

   //-------view all roles query----
    findAllroles(){
        return this.connection.promise().query(
        "SELECT roles.id, roles.title, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC;"
            ) 
    
        }

    //-------view all employee query----
    findAllEmployees(){
         return this.connection.promise().query(
         "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY ID ASC;"
            )
        }

    //-----Add new department query----
     addNewDept(deprtmentname){
         return this.connection.promise().query(
        `INSERT INTO  department (name) VALUES ("${deprtmentname}")`
               )
         }