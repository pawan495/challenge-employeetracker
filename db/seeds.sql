USE emptracker.db;

INSERT INTO department
  (name)
VALUES
("AI department"),
("Web Developer"),
("Agriculture"),
("HR"),
("Auto Mobile"),
("Data Admin")
  ;

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ("HR manager", 55000 , 1),
  ("Developer", 50000 ,1),
  ("AI", 45000 , 2),
  ("Service rep", 30000, 5),
  ("Service rep", 30000, 5),
  ("Car service" ,55000, 4),
  ("Truck service" ,56000,3 )
  ("IT", 54000,3);

INSERT INTO employee
    (first_name, last_name, role_id,manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);
  