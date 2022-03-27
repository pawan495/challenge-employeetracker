const express = require('express');
const inquirer = require("inquirer");
const { connection } = require("./db");
const db = require('./db');

init();
function init() {
    console.log("----------------********-----------------")
    console.log("        ❤  Employee Tracker ❤")
    console.log("----------------********-----------------")
    mainMenu()
}
function mainMenu(){
  inquirer.prompt([
      {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: [ "View Departments",  "View Roles", "View Employees",
                      "Add Department", "Add Role" ,"Add Employee",
                      "Update employee role", "Update employee managers",
                      "View by manager", "View by department",
                      "Delete employee", "Delete Role", "Delete Department",
                      "total budget" , "budget by department", " Exit Employee Tracker"],
                      pageSize: 10
      }
  ])
  .then(response =>{
      console.log(response)
      let userChoice = response.choice;
      console.log(userChoice)
      switch( userChoice ) {
          case "View Departments":
              viewDept();
               break;
           case "View Roles":
              viewRoles();
               break;
          case "View Employees":
              viewEmployees();
              break;
           case "Add Department":
              addDept();
              break;
          case "Add Role":
              addRole();
              break;
          case "Add Employee":
              addEmployee();
               break;
          case  "Update employee role":
              updateEmpRole();
               break;
          case "Update employee managers":
              updateEmpman();
              break;
          case "View by manager":
              viewByman();
              break;
          case "View by department":
              viewbyDept();
              break;
          case  "Delete Department":
              delDept();
              break;
          case "Delete Role":
              delRoles();
              break;
           case "Delete employee":
              delEmp();
              break;
          case "total budget":
              tolBudget();
               break;
          case" Exit Employee Tracker":
              Exit();
              break;
  }
})
}
//-------Function view all department------
function viewDept() {
    db.findAllDepartments()
      .then(([rows]) => {
          let employees = rows;
          console.table(employees)
      })
      .then(() => mainMenu())
  
  }

  // -------Function view all roles------
function viewRoles() {
    db.findAllroles()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
        .then(() => mainMenu())
}

  // -------Function view all employee------
function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees1 = rows;
            console.table(employees1)
        })
        .then(() => mainMenu())
}
//---------Function to add a department-----
function addDDept() {
  inquirer
  .prompt([
      {
        type: "input",
        message: "Enter the department name",
        name: "departmentname"
      }
    ])
  .then(response =>{
      let newDept = response.departmentname;
      db.addNewDept(newDept)
      console.log(`\n Deaprtment ${response.departmentname} ADDED \n`);
  })
  .then(() => mainMenu())
}
// ---------Function to add a new role------
function addRole(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "Enter the  title",
      name: "roletitle"
    },
    {
      type: "input",
      message: "Enter the salary",
      name: "salary",
      validate: salary => {
        let valid = /^\d+(\.\d{0,2})?$/.test(salary);
        if (valid) {
            return true;
        } else {
            console.log(`. Please enter in a valid number`)
            return false;} 
       }
      }
    ]).then(response => {
      let newrole = response.roletitle;
      let newsalary = response.salary;
      db.findAllDepartments()
      .then(([rows]) =>{
        let deptn = rows;
        const deptchoice = deptn.map(({dept_id, department}) => ({
         name: department,
         value: dept_id
        }))
        inquirer.prompt([
          {
            type: "list",
            message: "Enter the  department",
            name: "department",
            choices: deptchoice
          }
        ])
        .then(responce =>{
          let department1 = responce.department;
          db.addNewRole(newrole,newsalary,department1)
          console.log(`\n Role ${newrole} ADDED \n`);
  }).then(() => mainMenu())
      })})
  }
  
  
    // ---------Function to add a new employee------
    function addEmployee(){
      inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the  Employee firstname",
          name: "firstname"
        },
        {
          type: "input",
          message: "Enter the  Employee lastname",
          name: "lastname"
        },
        {
          type: "input",
          message: "Enter the Role id",
          name: "newemprole"
        },
        {
          type: "input",
          message: "Enter the Manager id",
          name: "newempdept"
        }
      ])
      .then(response =>{
        let newFirstn = response.firstname;
        let newLastn = response.lastname;
        let newErole = response.newemprole;
        let newEdept = response.newempdept
        db.addnewEmp(newFirstn,newLastn,newErole,newEdept)
        console.log(`\n Employee ${newFirstn}  ${newLastn} ADDED \n`); 
    }).then(() => mainMenu())
    
    }
    //-------View employee by manager------
  function  viewByman(){
    db.viewmanager()
    .then(([rows]) =>{
        let manger2 = rows;
        const man1 = manger2.map(({first_name}) => ({
         name: first_name,
        } ) )
        inquirer.prompt([
            {
            type: "list",
            name: "managern",
            message: "Choose the Manager name?",
            choices: man1
            }
        ] )
        .then (answer => {
           db.vewbymanager(answer.managern)
           .then(([rows2]) =>{
             let viewbm = rows2;
             console.table(viewbm)
           })
           .then(() => mainMenu())
                })
                
            })
  }

//-------View by Department ----
function   viewbyDept(){
  db.findAllDepartments()
  .then(([rows]) =>{
      let deptn = rows;
      const deptchoice = deptn.map(({department}) => ({
       name: department,
      } ) )
      inquirer.prompt([
          {
          type: "list",
          name: "deptname",
          message: "Choose the Department?",
          choices: deptchoice
          }
      ] )
      .then (answer => {
         db.viewbydept(answer.deptname)
         .then(([rows2]) =>{
           let viewbd = rows2;
           console.table(viewbd)
         })
         .then(() => mainMenu())
              })
              
          })
}


// Update employee role----
function  updateEmpRole(){
  db.findAllEmployees()
  .then(([rows]) =>{
      let employee1 = rows;
      const empchoice1 = employee1.map(({id,first_name,last_name}) => ({
       name: `${first_name} ${last_name}`,
       value: id
      }))
      inquirer.prompt([
          {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: empchoice1
          }
      ]).then (response => {
          let employeeId = response.employeeId;
          db.findAllroles()
  .then(([rows]) =>{
      let employee2 = rows;
      const emprolechoice = employee2.map(({id,title}) => ({
       name: title,
       value: id
      }))
              inquirer.prompt([
                  {
                  type: "list",
                  name: "empnewrole",
                  message: "Which  role do you want to assign to?",
                  choices: emprolechoice
                  }
              ]).then(response => {
                  let newrole = response.empnewrole;
                  db.updateEmpRole(employeeId, newrole)
                  console.log("Employee role updated");
              })
              .then(() => mainMenu())
          })
          
      })
  })
}

//----- Update employee manager function ------
/*function  updateEmpman(){
  db.findAllEmployees()
  .then(([rows]) =>{
      let employee1 = rows;
      const empchoice1 = employee1.map(({id,first_name,last_name}) => ({
       name: `${first_name} ${last_name}`,
       value: id
      }))
      inquirer.prompt([
          {
          type: "list",
          name: "employeeId",
          message: "Which employee's manager do you want to update?",
          choices: empchoice1
          }
      ]).then (response => {
          let employeeId = response.employeeId;
          db.findAllEmployees()
          .then (([rows1]) => {
              let manager1 = rows1;
              const manChoices2 = manager1.map(({id,first_name,last_name}) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
              }))
              inquirer.prompt([
                  {
                  type: "list",
                  name: "managername",
                  message: "Who is your new manager?",
                  choices: manChoices2
                  }
              ]).then(response => {
                  let newman = response.managername;
                  db.updateempman(employeeId, newman)
                  console.log("Employee manager updated");
                
              })
              .then(() => mainMenu())
          })
          })
  })
}*/

// --- Function to delete employee---
function  delEmp(){
  db.findAllEmployees()
  .then(([rows]) =>{
      let delemp1 = rows;
      const delempchoice= delemp1.map(({first_name}) => ({
       name: first_name,
      }))
      inquirer.prompt([
          {
          type: "list",
          name: "delemployeen",
          message: "Choose the employee to be delete?",
          choices: delempchoice
          }
      ])
      .then (answer => {
         db.delemployee(answer.delemployeen)
         console.log(`\n Employee ${answer.delemployeen} remove from company \n`)
         })
         .then(() => mainMenu())
              })     
}

// -------Function to delete role ----
function delroles(){
  db.findAllroles()
  .then(([rows3]) => {
    let delrole3 = rows3;
    const delroleChoice = delrole3.map(({title}) => ({
      name: title,
    }))
    inquirer.prompt([
      {
      type: "list",
      name: "delrole",
      message: "*** WARNING *** Deleting role will delete all employees associated with the role. Do you want to continue?",
      choices: delroleChoice
      }
  ])
  .then (answer => {
     db.delrolen(answer.delrole)
     console.log(`\n Role ${answer.delrole} removed from company \n`)
     })
     .then(() => mainMenu())
          })
}

// -------Function to delete Department ----
function delDept(){
  db.findAllDepartments()
  .then(([rows3]) => {
    let deldept1 = rows3;
    const deldeptChoice = deldept1.map(({department}) => ({
      name:   department
    }))
    inquirer.prompt([
      {
      type: "list",
      name: "deledept",
      message: "*** WARNING *** Deleting department will delete all roles & employees associated with the department. Do you want to continue?",
      choices: deldeptChoice
      }
  ])
  .then (answer => {
     db.deldeptn(answer.deledept)
     console.log(`\n Department ${answer.deledept} removed from company \n`)
     })
     .then(() => mainMenu())
          })
}

// ---- total budget of the company----

function  tolBudget() {
  console.log("hit")
  db.totalbudgets()
  .then(([rows]) => {
      let budget = rows;
      console.table(budget)
  })
  .then(() => mainMenu())
}

function exit(){
  console.log("Thanks for using Employee Tracker")
  process.exit()
}