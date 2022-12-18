const express= require('express');
const {getRespondents, deleteRespondent}= require("../controllers/respondent");

const router= express.Router();
router.route('/:surveyId').get(getRespondents);
router.route("/:id").delete(deleteRespondent);
module.exports= router; 