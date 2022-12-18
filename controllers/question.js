const Question = require("../models/Question");
const ResponseChoice = require("../models/ResponseChoice");
const Survey = require("../models/Survey");

exports.createQuestion = async (req, res, next) => {
   try {
      const survey = await Survey.findByPk(req.body.surveyId);
      if (!survey) {
         return res.status(404).json({ msg: `Faild to find a survey with id=${survey.id}` });
      }
      const question = await Question.create({
         text: req.body.text,
         surveyId: req.body.surveyId,
         type: req.body.type,
         order: req.body.order,
         required: req.body.required
      });
      if (req.body.type === "radio" || req.body.type === "checkbox" || req.body.type === "linear") {
         const responseChoices = await ResponseChoice.bulkCreate([
            ...req.body.responseChoices.map(function (item) { return { text: item.text, questionId: question.id } })
         ]
         );
         res.status(201).json({ ...question.dataValues, responseChoices });
      }
      else {
         res.status(201).json(question);
      }
   } catch (e) {
      console.log('😉', e.toString())
      res.status(500).json({ msg: "Faild to create question", error: e.toString() })
   }
}

exports.getQuestions = async (req, res, next) => {
   try {
      const survery = Survey.findByPk(req.params.surveyId);
      if (!survery) {
         return res.status(404).json({ msg: `Faild to find a survery with id = ${req.params.surveyId}` })
      }

      const questions = await Question.findAll({ where: { surveyId: req.params.surveyId }, order: ['order'], include: ResponseChoice });
      res.status(200).json(questions)
   } catch (e) {
      res.status(500).json({ msg: "Faild to fetch questions", error: e.toString() });
   }
}

exports.deleteQuestion = async (req, res, next) => {
   try {
      const question = await Question.findByPk(req.params.id);
      if (!question) {
         return res.status(404).json({ msg: `Faild to find question with id =${question.id}` });
      }
      await question.destroy();
      res.status(200).json({ msg: 'Question is deleted successfully' })
   } catch (e) {
      res.status(400).json({ msg: 'Faild to delete a question', error: e.toString() });
   }
}

exports.updateQuestion = async (req, res, next) => {
   try {
      const question = await Question.findByPk(req.params.id);
      if (!question) {
         return res.status(404).json({ msg: `Faild to find question with id =${question.id}` });
      }
      question.text = req.body.text
      question.surveyId = req.body.surveyId
      question.type = req.body.type
      question.order = req.body.order
      question.required = req.body.required

      await question.save();

      if (req.body.type === "radio" || req.body.type === "checkbox" || req.body.type === "linear") {
         await ResponseChoice.destroy({ where: { questionId: question.id } })

         const responseChoices = await ResponseChoice.bulkCreate([
            ...req.body.responseChoices.map(function (item) { return { text: item.text, questionId: question.id } })
         ]

         );
         res.status(200).json({ ...question.dataValues, responseChoices });
      }
      else {
         res.status(200).json(question);
      }

   } catch (e) {
      console.log("😉", e.toString())
      res.status(400).json({ msg: 'Faild to update a question', error: e.toString() });
   }
}