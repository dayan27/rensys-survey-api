const express = require("express");
const router = express.Router();
const {createResponse, getResponseSummary, getIndividualResponse} = require("../controllers/response")
router.route('/').post(createResponse);
router.route('/:surveyId').get(getResponseSummary);
router.route('/individual/:surveyId').get(getIndividualResponse);
module.exports= router; 