const db = require("../models/Survey");

module.exports = {
  findAllSurveys: () => db.find({}),

  findSurveyById: id => db.findById(id),

  createSurvey: survey => db.create(survey),

  addResponseToSurvey: (surveyId, response) => db.findByIdAndUpdate(surveyId, { $push: { responses: response } })
};
