const db = require("../models");

<<<<<<< HEAD
module.exports = {
  findAllSurveys: () => db.Survey.find({}),
  
  findSurveyById: (id) => db.Survey.findById(id),

  createSurvey: (survey) =>
    db.ResponseList.create([]).then((responseList) => {
=======
const surveyController = {
  findAllSurveys: () => db.Survey.find({}),

  findSurveyById: (id) => db.Survey.findById(id),

  createSurvey: (survey) =>
    db.ResponseList.create({ responses: [] }).then((responseList) => {
>>>>>>> 9b49ea06ab72bf0cc0dc8547f0ebfa36a15d14e6
      survey.responses = responseList._id;
      return db.Survey.create(survey);
    }),

  getResponseListBySurveyId: (id) =>
    db.Survey.findById(id).then((survey) =>
<<<<<<< HEAD
      this.getResponseListByResponseListId(survey.responses)
=======
      surveyController.getResponseListByResponseListId(survey.responses)
>>>>>>> 9b49ea06ab72bf0cc0dc8547f0ebfa36a15d14e6
    ),

  getResponseListByResponseListId: (id) =>
    db.ResponseList.findById(survey.responses),

  addResponseToSurveyBySurveyId: (surveyId, response) => {
<<<<<<< HEAD
    incrementSurveyResponseCounter(surveyId);
    return db.Survey.findById(surveyId).then((survey) =>
      this.addResponseToSurveyByResponseListId(survey.responses._id, response)
=======
    surveyController.incrementSurveyResponseCounter(surveyId);
    return db.Survey.findById(surveyId).then((survey) =>
      surveyController.addResponseToSurveyByResponseListId(
        survey.responses,
        response
      )
>>>>>>> 9b49ea06ab72bf0cc0dc8547f0ebfa36a15d14e6
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
<<<<<<< HEAD
=======

module.exports = surveyController;
>>>>>>> 9b49ea06ab72bf0cc0dc8547f0ebfa36a15d14e6
