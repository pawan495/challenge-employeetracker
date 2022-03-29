DROP DATABASE IF EXISTS empltrack_db;
CREATE DATABASE empltrack_db;
USE empltrack_db;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);

INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 10000, 1),
('Lead Engineer', 20000, 2),
('Software Engineer', 30000, 2),
('Account Manager', 40000, 3),
('Accountant', 50000, 3),
('Legal Team Lead', 60000, 4),
('Laywer', 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fraser', 1, null),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 3, null),
  ('Peter', 'Greenaway', 4, 2),
  ('Derek', 'Jarman', 5, null),
  ('Paolo', 'Pasolini', 6, 3),
  ('Heathcote', 'Williams', 7, null);



