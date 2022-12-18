const Survey = require('../models/Survey');
const Question = require('../models/Question')
const sequelize = require('../config/db');
const Respondent = require('../models/Respondent');
exports.getSurveys = async (req, res, next) => {
  try {
    const surveys = await Survey.findAll(
      {

        attributes: {
          include: [
            [sequelize.fn("COUNT", sequelize.fn('DISTINCT', sequelize.col("questions.id"))), "noOfQuestion"],
            [sequelize.fn("COUNT", sequelize.fn('DISTINCT', sequelize.col("respondents.id"))), "noOfRespondent"],
          ]
        },
        include: [
          {

            model: Question,
            attributes: []
          },
          {

            model: Respondent,
            attributes: []
          }
        ],
        group: ['id'],
        order: ['createdAt']
      }
    );
    res.status(200).json(surveys);

  } catch (e) {
    res.status(404).json({
      msg: "faild to fetch Survey",
      error: e.toString()
    });
  }
};


exports.getSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) {
      return res.status(404).json({
        msg: `There is no Survey with id=${req.params.id}`,
      });
    }
    res.status(200).json(survey);
  } catch (e) {
    res.status(404).json({
      msg: "Faild to fetch Survey",
    });
  }
};
exports.createSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.create({
      name: req.body.name,
      description: req.body.description,
      openingAt: req.body.openingAt,
      closingAt: req.body.closingAt,
      status: req.body.status
    });

    res.status(201).json(survey);
  } catch (e) {
    res.status(422).json({
      msg: "Faild to add Survey",
      error: e.toString()
    });
  }
};

exports.updateSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    survey.name = req.body.name;
    survey.description = req.body.description;
    survey.openingAt = req.body.openingAt;
    survey.closingAt = req.body.closingAt;
    // survey.status= req.body.status;

    const updatedSurvey = await survey.save();
    res.status(200).json(updatedSurvey);
  } catch (e) {
    res.status(400).json({
      msg: "Faild to update Survey",
    });
  }
};

exports.changeSurveyStatus = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey)
      return res.status(404).json({ msg: `Faild to find survery with id =${req.params.id}` });
    survey.status = !survey.status;
    const updatedSurvey = await survey.save();
    res.status(200).json(updatedSurvey);
  } catch (e) {
    res.status(400).json({
      msg: "Faild to change survey status",
      error: e.toString()
    });
  }
}

exports.deleteSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    const deletedSurvey = await survey.destroy();
    res.status(200).json(deletedSurvey);
  } catch (e) {
    res.status(404).json({
      msg: "Faild to delete a Survey",
    });
  }
};

exports.WSTrial = async (req, res, next) => {
  try {
    res.status(200).json('msg');
  } catch (e) {
    res.status(404).json({
      msg: "Faild to delete a Survey",
      e
    });
  }
};

exports.WSTrialEcho = async (req, res, next) => {
  try {
    res.status(200).json(req.body);
  } catch (e) {
    res.status(404).json({
      msg: "Faild to delete a Survey",
      error: e
    });
  }
};
