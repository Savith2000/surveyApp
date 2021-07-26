const db = require("../models");

module.exports = {
  findAllSurveys: () => db.Survey.find({}),

  findSurveyById: (id) => db.Survey.findById(id),

  createSurvey: (survey) =>
    db.ResponseList.create([]).then((responseList) => {
      survey.responses = responseList._id;
      return db.Survey.create(survey);
    }),

  addResponseToSurveyBySurveyId: (surveyId, response) => {
    incrementSurveyRespontCounter(surveyId);
    return db.Survey.findById(surveyId).then((survey) =>
      this.addResponseToSurveyByResponseListId(survey.responses._id, response)
    );
  },

  // Do not use without calling incrementSurveyResponseCounter!
  addResponseToSurveyByResponseListId: (responseListId, response) =>
    db.ResponseList.findByIdAndUpdate(responseListId, {
      $push: { responses: response },
    }),

  incrementSurveyResponseCounter: (surveyId) =>
    db.survey.findByIdAndUpdate(surveyId, { $inc: { responseAmount: 1 } }),
};
