const db = require('../db');

// questions
const getQuestionsFromDb = ( product_id, count, page ) => {
  console.log(product_id, count, page);
  // const queryString = `
  //   SELECT * FROM questions WHERE product_id = ${product_id} AND reported = 0 LIMIT ${
  //     count || 5
  //   } OFFSET 0
  // `;
  const queryString = `SELECT * FROM questions WHERE product_id = 1 LIMIT 5`;
  return db.query(queryString)
    .then(data => {
      console.log('models, data.rows: ', data);
      return data.rows })
    .catch(err => err);
};


// const getQuestionsFromDb = async ({ product_id, count, page }) => {
//   // var q = `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = 0 LIMIT ${
//   //   count || 5
//   // } OFFSET ${page * count - count || 0}`
//   // console.log('this is q', q);
//   try {
//     const query = await db.query(
//       `SELECT * FROM questions WHERE product_id = ${product_id} AND reported = 0 LIMIT ${
//         count || 5
//       } OFFSET ${page * count - count || 0}`,
//     );
//     return Promise.resolve(query);
//   } catch (err) {
//     console.error(err);
//     return Promise.reject(err);
//   }
// };

const postQuestionsToDb = async (data) => {
  try {
    const query = await db.query(
      'INSERT INTO question (asker_name, asker_email, question_body, question_date, product_id) VALUES ($1, $2, $3, $4, $5)',
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
      `UPDATE question SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`,
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
      `UPDATE question SET reported = true WHERE question_id = ${question_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// answers
const getAnswersFromDb = async ({ question_id, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM answer WHERE question_id = ${question_id} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.sort((a, b) => b.helpfulness - a.helpfulness));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postAnswerToDb = async (data) => {
  try {
    const query = await db.query(
      'INSERT INTO answer (question_id, body, date, answerer_name, answerer_email, photos) VALUES ($1, $2, $3, $4, $5, $6)',
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
      `UPDATE answer SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`,
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
      `UPDATE answer SET reported = true WHERE answer_id = ${answer_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  getQuestionsFromDb,
  postQuestionsToDb,
  putQuestionHelpfullnessInDB,
  reportQuestionInDb,
  getAnswersFromDb,
  postAnswerToDb,
  putAnswerHelpfullnessInDB,
  reportAnswerInDb,
}