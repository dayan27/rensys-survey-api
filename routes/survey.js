const express = require('express');
const router = express.Router();

const { getSurveys,
       getSurvey,
       createSurvey,
       deleteSurvey,
       updateSurvey,
       changeSurveyStatus,
       WSTrial,WSTrialEcho
} = require('../controllers/survey');

router.route('/').get(getSurveys).post(createSurvey);
router.route('/:id').get(getSurvey).delete(deleteSurvey).put(updateSurvey);
router.route('/status/:id').put(changeSurveyStatus);
router.route("/ws/echo").get(WSTrial)
router.route("/ws/create/echo").post(WSTrialEcho)
module.exports = router;