const express = require('express');
const router = express.Router();
const {
  getQuestions,
  postQuestion,
  updateQuestionHelpfullness,
  reportQuestion,
  getAnswers,
  postAnswer,
  updateAnswerHelpfullness,
  reportAnswer,
} = require('../controllers');

router.get('/questions/:product_id?/:count?/:page?', getQuestions);
router.get('/questions/:question_id/answers', getAnswers);

router.post('/questions', postQuestion);
router.post('/questions/:question_id/answers', postAnswer);

router.put('/questions/:question_id/helpful', updateQuestionHelpfullness);
router.put('/answers/:answer_id/helpful', updateAnswerHelpfullness);

router.put('/questions/:question_id/report', reportQuestion);
router.put('/answers/:answer_id/report', reportAnswer);

module.exports = router;