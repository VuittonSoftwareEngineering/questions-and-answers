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
const getQuestions = async (req, res) => {
  const product_id = req.params.product_id || req.query.product_id;
  const count = req.params.count || req.query.count;
  const page = req.params.page || req.query.page;

  try {
    const questions = await getQuestionsFromDb(product_id, count, page);
    res.send(questions)
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const postQuestion = async (req, res) => {
  try {
    await postQuestionsToDb([
      // check if it's in body
      req.body.product_id,
      req.body.question_body,
      // req.body.date,
      Date.now(),
      req.body.asker_name,
      req.body.asker_email,
    ]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const updateQuestionHelpfullness = async (req, res) => {
  const question_id = req.params.question_id || req.query.question_id;
  try {
    console.log(req.params.question_id);
    await putQuestionHelpfullnessInDB(question_id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const reportQuestion = async (req, res) => {
  const question_id = req.params.question_id || req.query.question_id;
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
    question: req.params.question_id,
    count: req.params.count,
    page: req.params.page,
  };
  try {
    const answers = await getAnswersFromDb(query);
    const answersId = [];
    for (let i = 0; i < answers.length; i += 1) {
      answersId.push(answers[i].answer_id);
    }
    console.log('answersId: ', answersId);
    console.log('answers: ', answers)
    res.send(answers);
  } catch (err) {
    console.error(err);
    res.send(err).status(404);
  }
};

const postAnswer = async (req, res) => {
  const query = [
    req.params.question_id,
    req.body.body,
    Date.now(),
    req.body.answerer_name,
    req.body.answerer_email,
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
  const answer_id = req.query.answer_id || req.params.answer_id
  try {
    await putAnswerHelpfullnessInDB(answer_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const reportAnswer = async (req, res) => {
  const answer_id = req.query.answer_id || req.params.answer_id;
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
  postQuestion,
  updateQuestionHelpfullness,
  reportQuestion,
  getAnswers,
  postAnswer,
  updateAnswerHelpfullness,
  reportAnswer,
}
