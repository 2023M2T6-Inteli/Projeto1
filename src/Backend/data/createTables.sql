BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS teacher (
  teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_name TEXT,
  email TEXT,
  teacher_password TEXT
);

CREATE TABLE IF NOT EXISTS class (
  class_id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_name TEXT,
  school_year INTEGER,
  school TEXT,
  teacher_id INTEGER,
  FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id)
);

CREATE TABLE IF NOT EXISTS student (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_name TEXT,
  class_id INTEGER,
  FOREIGN KEY (class_id) REFERENCES class (class_id)
);

CREATE TABLE IF NOT EXISTS activity (
  activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_name TEXT,
  activity_description TEXT
);

CREATE TABLE IF NOT EXISTS participate (
  activity_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  note_id INTEGER,
  PRIMARY KEY (activity_id, student_id),
  FOREIGN KEY (activity_id) REFERENCES activity (activity_id),
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  FOREIGN KEY (note_id) REFERENCES grade (note_id)
);

CREATE TABLE IF NOT EXISTS grade (
  note_id INTEGER PRIMARY KEY AUTOINCREMENT,
  grade_value FLOAT
);

CREATE TABLE IF NOT EXISTS skill (
  skill_id TEXT PRIMARY KEY,
  skill_description TEXT
);

CREATE TABLE IF NOT EXISTS evaluate (
  activity_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  PRIMARY KEY (activity_id),
  FOREIGN KEY (activity_id) REFERENCES activity (activity_id),
  FOREIGN KEY (skill_id) REFERENCES skill (skill_id)
);

CREATE TABLE IF NOT EXISTS demonstrate (
  skill_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  FOREIGN KEY (skill_id) REFERENCES skill (skill_id),
  FOREIGN KEY (student_id) REFERENCES student (student_id),
  PRIMARY KEY (skill_id, student_id)
);

CREATE TABLE IF NOT EXISTS depend (
  skill_id INTEGER NOT NULL,
  dependent_id INTEGER NOT NULL,
  FOREIGN KEY (skill_id) REFERENCES skill (skill_id),
  FOREIGN KEY (dependent_id) REFERENCES skill (skill_id),
  PRIMARY KEY (skill_id)
);

COMMIT;
