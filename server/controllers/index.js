const {
  getQuestionsFromDb,
  postQuestionsToDb,
  putQuestionHelpfullnessInDB,
  reportQuestionInDb,
  getAnswersFromDb,
  postAnswerToDb,
  putAnswerHelpfullnessInDB,
  reportAnswerInDb,
} = require('../models')

// questions
// const getQuestions = async (req, res) => {
//   const query = {
//     product_id: req.query.product_id,
//     count: req.query.count,
//     page: req.query.page,
//   };
//   try {
//     const questions = await getQuestionsFromDb(query);
//     console.log('this is the response: ', questions)
//     res.send(questions);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(404);
//   }
// };

const getQuestions = (req, res) => {
  getQuestionsFromDb(req.params.product_id, req.params.count, req.params.page)
   .then(data => res.status(200).send(data))
   .catch(err => res.status(400));
};

const getSomeQuestions = async (req, res) => {
  try {
    const questions = await getQuestionsFromDb();
    res.send(questions);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const postQuestion = async (req, res ) => {
  const query = [
    req.body.name,
    req.body.email,
    req.body.body,
    req.body.date,
    req.query.product_id,
  ];
  try {
    await postQuestionsToDb(query);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const updateQuestionHelpfullness = async (req, res) => {
  const question_id = req.query.question_id;
  try {
    await putQuestionHelpfullnessInDB(question_id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const reportQuestion = async (req, res) => {
  const question_id = req.query.question_id;
  try {
    await reportQuestionInDb(question_id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

// answers
const getAnswers = async (req, res) => {
  const query = {
    question_id: req.query.question_id,
    count: req.query.count,
    page: req.query.page,
  };
  try {
    const answers = await getAnswersFromDb(query);
    res.send(answers);
  } catch (err) {
    console.error(err);
    res.send(err).status(404);
  }
};

const postAnswer = async (req, res) => {
  const query = [
    req.query.question_id,
    req.body.body,
    req.body.date,
    req.body.name,
    req.body.email,
    req.body.photos,
  ];
  try {
    await postAnswerToDb(query);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const updateAnswerHelpfullness = async (req, res) => {
  const answer_id = req.query.answer_id;
  try {
    await putAnswerHelpfullnessInDB(answer_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const reportAnswer = async (req, res) => {
  const answer_id = req.query.answer_id;
  try {
    await reportAnswerInDb(answer_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

module.exports = {
  getQuestions,
  getSomeQuestions,
  postQuestion,
  updateQuestionHelpfullness,
  reportQuestion,
  getAnswers,
  postAnswer,
  updateAnswerHelpfullness,
  reportAnswer,
}
