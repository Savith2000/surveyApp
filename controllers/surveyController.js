const db = require("../models");

module.exports = {
  findAllSurveys: () => db.Survey.find({}),

  findSurveyById: (id) => db.Survey.findById(id),

  createSurvey: (survey) =>
    db.ResponseList.create([]).then((responseList) => {
      survey.responses = responseList._id;
      return db.Survey.create(survey);
    }),

  addResponseToSurveyBySurveyId: (surveyId, response) =>
    db
      .findById(surveyId)
      .then((survey) =>
        this.addResponseToSurveyByResponseListId(survey.responses._id, response)
      ),
  addResponseToSurveyByResponseListId: (responseListId, response) =>
    db.findByIdAndUpdate(responseListId, { $push: { responses: response } }),
};
