const express = require("express");
const {createQuestion, getQuestions,deleteQuestion,updateQuestion} = require("../controllers/question")
const router = express.Router();

router.route('/').post(createQuestion);
router.route('/:surveyId').get(getQuestions);
router.route('/:id').delete(deleteQuestion).put(updateQuestion);
module.exports = router;  