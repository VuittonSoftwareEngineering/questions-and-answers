-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS answers CASCADE;
-- DROP TABLE IF EXISTS photos;


CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL PRIMARY KEY,
  product_id BIGINT,
  question_body VARCHAR(200),
  question_date BIGINT,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN DEFAULT false,
  question_helpfulness INT DEFAULT 0
);
-- COPY questions FROM '/Users/simon/Hack Reactor/SDC/data/questions.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL PRIMARY KEY,
  question BIGINT,
  body VARCHAR(200),
  "date" BIGINT,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN DEFAULT false,
  helpfulness INT DEFAULT 0,
  FOREIGN KEY (question) REFERENCES questions(question_id)
);
-- COPY answers FROM '/Users/simon/Hack Reactor/SDC/data/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  answer_id INT,
  "url" VARCHAR(255),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);
-- COPY photos FROM '/Users/simon/Hack Reactor/SDC/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT SETVAL('questions_question_id_seq', (SELECT MAX(question_id) FROM questions));
SELECT SETVAL('answers_answer_id_seq', (SELECT MAX(answer_id) FROM answers));
SELECT SETVAL('photos_id_seq', (SELECT MAX(id) FROM photos));
