USE empltrack_db;

-- INSERT INTO department
--   (name)
-- VALUES
-- ("AI department"),
-- ("Web Developer"),
-- ("Agriculture"),
-- ("HR"),
-- ("Auto Mobile"),
-- ("Data Admin")
--   ;

-- INSERT INTO roles
--   (title, salary, department_id)
-- VALUES
--   ("HR manager", 55000 , 1),
--   ("Developer", 50000 ,1),
--   ("AI", 45000 , 2),
--   ("Service rep", 30000, 5),
--   ("Car service" ,55000, 3),
--   ("Truck service" ,56000,3 ),
--   ("IT", 54000,1),
--   ("Agri admin", 53000,4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
  ('Pawanpreet', 'Kaur', 1, null),
  ('Jasmeet', 'Kaur', 2, 1);
  -- ('Tripti', 'Kaur', 4, 0);
  -- ('Jatinder ', 'Singh', 1, null),
  -- ('Rajinder', 'Singh', 3, 1),
  -- ('Chinmey', 'Dixit', 2, 0),
  -- ('Suman', 'Sharma', 1, 0),
  -- ('Montague', 'Summers', 3, 1),
  -- ('Octavia', 'Butler', 3, 1);  