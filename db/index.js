

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

     //----Add new Role query----
     addNewRole(newrole,newsalary,department1) {
        return this.connection.promise().query(
        `INSERT INTO roles (title, salary, department_id)  VALUES  ("${newrole}", ${newsalary}, ${department1});`
        )
    }
    
  //----Add new employee query----
    addnewEmp(newFirstn,newLastn,newErole,newEdept){
        return this.connection.promise().query(
        `INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("${newFirstn}", "${newLastn}", ${newErole}, ${newEdept});`
        )
    }

    // ----- View by manager query -----
    vewbymanager(empmanId){
        return this.connection.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id  INNER JOIN roles ON employee.role_id = roles.id  where m.first_name = "${empmanId}";` 
        )
     }


     // --- View manager only query-----
  viewmanager(){
    return this.connection.promise().query(
    `SELECT employee.id, employee.first_name, employee.last_name
    FROM employee  
    where manager_id is null;;`
    )
  }

// ---- View by department query ------
  viewbydept(deptn2){
    return this.connection.promise().query(
        ` SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee employee LEFT JOIN employee m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id where department.name =  "${deptn2}";`
    )
  }

  //--- Update employee role query---
  updateEmpRole(employeeId, newrole){
    return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?;" , [newrole, employeeId]
    )
}

// -----Update employee manager query----
  updateempman(employeeId, newman){
    return this.connection.promise().query(
        "UPDATE employee SET manager_id = ? where id = ?;" , [newman, employeeId]
    )
 }

 //--- Delete employee ------
 delemployee(delemp){
    return this.connection.promise().query(
    `DELETE FROM employee WHERE first_name = "${delemp}";`
    )
  }

// //------ Delete role------
  delrolen(delrole2){
    return this.connection.promise().query(
        `DELETE FROM roles WHERE title = "${delrole2}";`
        )
     }

     deldeptn(deldept2){
        return this.connection.promise().query(
            `DELETE FROM department WHERE name = "${deldept2}";`
            )
    }

    totalbudgets(){
        return this.connection.promise().query( "SELECT  SUM(salary) AS budget FROM  roles INNER JOIN department ON roles.department_id = department.id inner join employee on employee.role_id = roles.id")
     }

     budbydept1(bbDebt){
        return this.connection.promise().query(
           `SELECT department_id AS id, 
           department.name AS department,
           SUM(salary) AS budget
           FROM  roles  
           INNER JOIN department ON roles.department_id = department.id 
           inner join employee on employee.role_id = roles.id
           where department.name = "${bbDebt}";`
        )
   }

}

module.exports = new DB(connection);