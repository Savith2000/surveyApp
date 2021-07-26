const db = require("../models/Survey");

module.exports = {
  findAllSurveys: () => db.find({}),

  findSurveyById: id => {
    db.findById((id), (data) => {
      console.log(data);
      return data;
    });
  },

  createSurvey: survey => db.create(survey),

  addResponseToSurvey: (surveyId, response) => db.findByIdAndUpdate(surveyId, { $push: { responses: response } })
};
