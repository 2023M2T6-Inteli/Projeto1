CREATE TABLE IF NOT EXISTS teacher (
  teacher_id INTEGER PRIMARY KEY,
  teacher_name TEXT,
  email TEXT,
  teacher_password TEXT
);

CREATE TABLE IF NOT EXISTS school (
  school_id INTEGER PRIMARY KEY,
  school_name TEXT
);

CREATE TABLE IF NOT EXISTS activity (
  activity_id INTEGER PRIMARY KEY,
  activity_name TEXT,
  activity_description TEXT,
  skill_id TEXT,
  teacher_id INTEGER,
  FOREIGN KEY (skill_id) REFERENCES skill (skill_id)
  FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id)
);

CREATE TABLE IF NOT EXISTS class (
  class_id INTEGER PRIMARY KEY,
  class_name TEXT,
  school_year INTEGER,
  school_id INTEGER,
  teacher_id INTEGER,
  FOREIGN KEY (school_id) REFERENCES school (school_id),
  FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id)
);

CREATE TABLE IF NOT EXISTS skill (
  skill_id TEXT PRIMARY KEY,
  skill_description TEXT,
  subject TEXT
);

CREATE TABLE IF NOT EXISTS grade (
  grade_id INTEGER PRIMARY KEY,
  grade_value FLOAT,
  class_id INTEGER,
  activity_id INTEGER,
  FOREIGN KEY (class_id) REFERENCES class (class_id),
  FOREIGN KEY (activity_id) REFERENCES activity (activity_id)
);
