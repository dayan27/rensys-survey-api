const Respondent = require("../models/Respondent")

exports.createRespondent = async (resp) => {
    console.log(resp)
    return await Respondent.create({
        name: resp.name,
        phoneNo: resp.phoneNo,
        region: resp.region,
        zone: resp.zone,
        woreda: resp.woreda,
        kebele: resp.kebele
    });
}

exports.getRespondents = async (req, res, next) => {
    //fetch respondents of a certain survey
    try {
        const respondent = await Respondent.findAll({ where: { surveyId: req.params.surveyId } });
        res.status(200).json(respondent);

    } catch (e) {
        res.status(400).json({
            msg: `Faild to fetch respondent with survey id = ${req.params.surveyId}`
        });
    }
}

exports.deleteRespondent = async (req, res, next) => {
    try {
        const respondent = await Respondent.findOne({ where: { id: req.params.id } });
        if (!respondent) {
            return res.status(404).json({ msg: `Faild to find renspondent with id=${req.params.id}` })
        }
        await respondent.destroy();
        res.status(200).json({ msg: "Successfully deleted" });

    } catch (e) {
        res.status(400).json({
            msg: `Faild to delete respondent with id = ${req.params.id}`
        });
    }
}