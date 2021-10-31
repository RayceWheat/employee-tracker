INSERT INTO departments 
  (name)
VALUES
  ('Human Resources'),
  ('Dev Team');

INSERT INTO roles 
  (title, salary, department_id)
VALUES
  ('Engineer', 100000, 2),
  ('Human', 60000, 1);

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Bobert', 'Bobbing', 1, NULL),
  ('James', 'Wood', 2, 1),
  ('Kathy', 'Lastname', 1, 1);