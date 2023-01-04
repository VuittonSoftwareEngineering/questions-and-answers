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

// router.get('/', (req, res) => {
//   res.json({ info: 'Welcome to Node.js, Express, and Postgres API' })
// });
router.get('/qa/questions/:product_id/:count?/:page?', getQuestions);
router.post('/:product_id?', postQuestion);
router.put('/:question_id?/helpful', updateQuestionHelpfullness);
router.put('/:question_id?/report', reportQuestion);
router.get('/qa/questions/:question_id?/answers', getAnswers);
router.post('/qa/questions/:question_id?/answers', postAnswer);
router.put('/qa/answers/:answer_id?/helpful', updateAnswerHelpfullness);
router.put('/qa/answers/:answer_id?/report', reportAnswer);

module.exports = router;