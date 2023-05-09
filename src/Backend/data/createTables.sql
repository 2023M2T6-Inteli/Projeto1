BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "professor" (
	"idprofessor"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"nome"	TEXT,
	"email"	TEXT,
	"senha"	TEXT
);
CREATE TABLE IF NOT EXISTS "turma" (
	"idturma"	INTEGER,
	"ano"	INTEGER,
	"escola"	TEXT,
	"idprofessor"	INTEGER,
	PRIMARY KEY("idturma"),
	FOREIGN KEY("idprofessor") REFERENCES "professor"("idprofessor")
);
CREATE TABLE IF NOT EXISTS "aluno" (
	"idaluno"	INTEGER,
	"nome"	TEXT,
	"idturma"	INTEGER,
	PRIMARY KEY("idaluno"),
	FOREIGN KEY("idturma") REFERENCES "turma"("idturma")
);
CREATE TABLE IF NOT EXISTS "atividade" (
	"idatividade"	INTEGER,
	"nome_atividade"	TEXT,
	"descricao_atividade"	TEXT,
	PRIMARY KEY("idatividade")
);
CREATE TABLE IF NOT EXISTS "participa" (
	"idatividade"	INTEGER NOT NULL,
	"idaluno"	INTEGER NOT NULL,
	"idnota"	INTEGER,
	PRIMARY KEY("idatividade","idaluno"),
	FOREIGN KEY("idatividade") REFERENCES "atividade"("id"),
	FOREIGN KEY("idaluno") REFERENCES "aluno"("id"),
	FOREIGN KEY("idnota") REFERENCES "nota"("id")
);
CREATE TABLE IF NOT EXISTS "nota" (
	"idnota"	INTEGER
	"nota"	FLOAT,
	PRIMARY KEY("idnota")
);
CREATE TABLE IF NOT EXISTS "habilidade" (
	"idhabilidade"	TEXT,
	"descricao_habilidade"	TEXT,
	PRIMARY KEY("idhabilidade")
);
CREATE TABLE IF NOT EXISTS "avalia" (
	"idatividade"	INTEGER NOT NULL,
	"idhabilidade"	INTEGER NOT NULL,
	PRIMARY KEY("idatividade"),
	FOREIGN KEY("idatividade") REFERENCES "atividade"("id"),
	FOREIGN KEY("idhabilidade") REFERENCES "habilidade"("id")
);
CREATE TABLE IF NOT EXISTS "demonstra" (
	"idhabilidade"	INTEGER NOT NULL,
	"idaluno"	INTEGER NOT NULL,
	FOREIGN KEY("idhabilidade") REFERENCES "habilidade"("id"),
	FOREIGN KEY("idaluno") REFERENCES "aluno"("id"),
	PRIMARY KEY("idhabilidade","idaluno")
);
CREATE TABLE IF NOT EXISTS "depende" (
	"idhabilidade"	INTEGER NOT NULL,
	"iddependente"	INTEGER NOT NULL,
	FOREIGN KEY("idhabilidade") REFERENCES "habilidade"("id"),
	FOREIGN KEY("iddependente") REFERENCES "habilidade"("id"),
	PRIMARY KEY("idhabilidade")
);
COMMIT;