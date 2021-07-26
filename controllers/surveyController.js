const db = require("../models/Survey");

module.exports = {
  findAllSurveys: () => db.find({}),

  findSurveyById: id => db.findById(id),

  createSurvey: survey => db.create(survey),

  addResponseToSurvey: (surveyId, Response) => db.findByIdAndUpdate(surveyId, { $push: { responses: Response } })
};
