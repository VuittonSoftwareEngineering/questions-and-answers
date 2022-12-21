CREATE SCHEMA IF NOT EXISTS api AUTHORIZATION me;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question_body VARCHAR(200),
  question_date TIMESTAMP,
  asker_name VARCHAR(25),
  asker_email VARCHAR(50),
  reported INT,
  question_helpfulness INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  body VARCHAR(200),
  "date" TIMESTAMP,
  answerer_name VARCHAR(25),
  answerer_email VARCHAR(50),
  reported INT,
  helpfulness INT,
  FOREIGN KEY (questions_id) REFERENCES questions(id)
);

CREATE TABLE [IF NOT EXISTS] photos (
  id SERIAL PRIMARY KEY,
  url_photo VARCHAR(100),
  FOREIGN KEY (answers_id) REFERENCES answers(id)
);