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

router.get('/questions/:question_id/answers', getAnswers); // working
router.get('/questions/:product_id?/:count?/:page?', getQuestions); // working

router.post('/questions/:question_id/answers', postAnswer); // working
router.post('/questions', postQuestion); // working

router.put('/questions/:question_id/helpful', updateQuestionHelpfullness); // working
router.put('/answers/:answer_id/helpful', updateAnswerHelpfullness); // working

router.put('/questions/:question_id/report', reportQuestion); // working
router.put('/answers/:answer_id/report', reportAnswer); // working

module.exports = router;