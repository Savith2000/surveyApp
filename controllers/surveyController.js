const db = require("../models/Survey");

module.exports = {
  findAllSurveys: function () {
    return db.find({});
  },

  findSurveyById: function (id) {
    return db.findById(id);
  },

  createSurvey: function (survey) {
    return db.create(survey);
  },
  addResponseToSurvey: function (surveyId, Response) {
    return db.findByIdAndUpdate(surveyId, { $push: { responses: Response } });
  },
};
