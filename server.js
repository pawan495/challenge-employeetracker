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
