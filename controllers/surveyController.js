const db = require("../models");

const surveyController = {
  findAllSurveys: () => db.Survey.find({}),

  findSurveyById: (id) => db.Survey.findById(id),

  createSurvey: (survey) =>
    db.ResponseList.create([]).then((responseList) => {
      survey.responses = responseList._id;
      return db.Survey.create(survey);
    }),

  getResponseListBySurveyId: (id) =>
    db.Survey.findById(id).then((survey) =>
      surveyController.getResponseListByResponseListId(survey.responses)
    ),

  getResponseListByResponseListId: (id) =>
    db.ResponseList.findById(survey.responses),

  addResponseToSurveyBySurveyId: (surveyId, response) => {
    surveyController.incrementSurveyResponseCounter(surveyId);
    return db.Survey.findById(surveyId).then((survey) =>
      surveyController.addResponseToSurveyByResponseListId(
        survey.responses._id,
        response
      )
    );
  },

  // Do not use without calling incrementSurveyResponseCounter!
  addResponseToSurveyByResponseListId: (responseListId, response) =>
    db.ResponseList.findByIdAndUpdate(responseListId, {
      $push: { responses: response },
    }),

  incrementSurveyResponseCounter: (surveyId) =>
    db.Survey.findByIdAndUpdate(surveyId, { $inc: { responseAmount: 1 } }),
};

module.exports = surveyController;
