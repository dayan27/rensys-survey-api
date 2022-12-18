const Question = require("../models/Question");
const Respondent = require("../models/Respondent");
const Response = require("../models/Response");
const Survey = require("../models/Survey");
const ResponseChoice = require("../models/ResponseChoice");
const { Op } = require("sequelize")

exports.createResponse = async (req, res, next) => {
  try {
    const { name, phoneNumber, region, zone, woreda, kebele } = req.body.userData;
    const respondent = await Respondent.create({
      name,
      phoneNo: phoneNumber,
      region,
      zone,
      woreda,
      kebele,
      surveyId: req.body.surveyId
    });
    // req.body.questionResponses
    let responses = []
    req.body.questionResponses.forEach((response) => {
      if (response.multipleAnswer?.length > 0) {
        response.multipleAnswer?.forEach((ans) => {
          responses.push({
            respondentId: respondent.id,
            questionId: response.questionId,
            answer: ans
          })
        }
        );
        return;
      }
      responses.push({ respondentId: respondent.id, answer: response.answer, questionId: response.questionId });
    });

    const response = await Response.bulkCreate(
      responses
      // ...req.body.response.map((item) => { return { respondentId: respondent.id, ...item } })
    );
    res.status(201).json({ ...respondent.dataValues, response });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Faild to save response", error: e.toString() })
  }

}

exports.getIndividualResponse = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.surveyId)
    if (!survey) {
      return res.status(404).json({ msg: `Couldn't find a survey with id=${req.params.surveyId}` });
    }
    const individualResponse = await Respondent.findAll({
      required: true,
      include: {
        model: Question,
        required: true,
        include: [
          {
            model: Response,
            attributes: ['answer', 'respondentId'],
            where: {
              respondentId: {
                [Op.col]: 'respondent.id'
              }
            },
          },
          {
            model: ResponseChoice
          }]
      },
      where: { surveyId: req.params.surveyId }
    })

    res.status(200).json(individualResponse);
  } catch (e) {
    res.status(500).json({ msg: "Faild to fetch individual response", error: e.toString() })
  }
}

exports.getResponseSummary = async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      where: { surveyId: req.params.surveyId },
      include: [{ model: Response, attributes: ['answer'] }, { model: ResponseChoice, attributes: ['text'] }]
    });

    let summary = [];
    questions.forEach(question => {
      let responses = question.responses.map((item) => item.answer);

      let count = {};
      responses.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

      if (question.type != "linear" && question.type != "short") {
        let choices = question.responseChoices.map((item) => item.text);
        for (let choice of choices) {
          count[choice] = count[choice] || 0;
        }
      }

      if (question.type == "linear") {
        let choices = question.responseChoices.map((item) => item.text);
        let min = Math.min.apply(null, choices);
        let max = Math.max.apply(null, choices);


        choices = Array.from({ length: max - min + 1 }, (_, i) => min + i + '')
        for (let choice of choices) {
          count[choice] = count[choice] || 0;
        }


      }

      summary.push({ text: question.text, type: question.type, order: question.order, require: question.require, responses: count })
    });
    res.status(200).json(summary);


  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
}