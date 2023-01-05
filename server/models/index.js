const db = require('../db');

// photos
const getPhotosFromDb = async (answer_ids) => {
  const answerIdsList = answer_ids.join();
  console.log('joined answer ids from model: ', answerIdsList)
  try {
    const query = await db.query(
      `SELECT * FROM photos WHERE answer_id IN (${answerIdsList})`
    );
    return Promise.resolve(query.rows)
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
// questions
const getQuestionsFromDb = async (product_id, count, page ) => {
  try {
    const query = await db.query(
      `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.rows);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postQuestionsToDb = async (data) => {
  try {
    const query = await db.query(
      `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email) VALUES($1, $2, $3, $4, $5)`,
      data,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putQuestionHelpfullnessInDB = async (question_id) => {
  try {
    const query = await db.query(
      `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const reportQuestionInDb = async (question_id) => {
  try {
    const query = await db.query(
      `UPDATE questions SET reported = true WHERE question_id = ${question_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// answers
const getAnswersFromDb = async ({ question, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM answers WHERE question = ${question} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.rows);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postAnswerToDb = async (data) => {
  try {
    const query = await db.query(
      'INSERT INTO answers (question, body, date, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5)',
      data,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putAnswerHelpfullnessInDB = async (answer_id) => {
  try {
    const query = await db.query(
      `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const reportAnswerInDb = async (answer_id) => {
  try {
    const query = await db.query(
      `UPDATE answers SET reported = true WHERE answer_id = ${answer_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  getPhotosFromDb,
  getQuestionsFromDb,
  postQuestionsToDb,
  putQuestionHelpfullnessInDB,
  reportQuestionInDb,
  getAnswersFromDb,
  postAnswerToDb,
  putAnswerHelpfullnessInDB,
  reportAnswerInDb,
}