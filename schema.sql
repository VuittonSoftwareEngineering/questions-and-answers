DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  body VARCHAR(200),
  date_written BIGINT,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported INT,
  question_helpfulness INT
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT,
  body VARCHAR(200),
  date_written BIGINT,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported INT,
  answer_helpfulness INT,
  FOREIGN KEY (questions_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id INT,
  "url" VARCHAR(255),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
)

