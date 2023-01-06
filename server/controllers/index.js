const {
  getPhotosFromDb,
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

// const postQuestion = async (req, res) => {
//   try {
//     await postQuestionsToDb([
//       // check if it's in body
//       4,
//       "req.body.question_body",
//       // req.body.date,
//       Date.now(),
//       "req.body.asker_name",
//       "req.body.asker_email",
//     ]);
//     res.sendStatus(201);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(404);
//   }
// };

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
// getAnswersFromDb(query)
const getAnswers = async (req, res) => {
  const query = {
    question: req.params.question_id,
    count: req.params.count,
    page: req.params.page,
  };
  try {
    let answers = await getAnswersFromDb(query);
    console.log('answers: ', answers);

    const answer_ids = answers.map(answer => answer.answer_id);
    console.log('answersId: ', answer_ids);

    const photos = await getPhotosFromDb(answer_ids);
    console.log('photos from controllers', photos);
    // create answers object
    answers = answers.map( answer => {
      answer.photos = photos
        .filter(photo => photo.answer_id === answer.answer_id)
        .map(photo => {
          return {
            id: photo.id,
            url: photo.url,
          }
        })
      return answer;
    })
    const obj = {
      question: req.params.question_id,
      page: req.params.page || 0,
      count: answers.length,
      results: answers,
    }

    res.status(200).json(obj);
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
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
