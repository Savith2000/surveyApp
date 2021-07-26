const db = require("../models/Survey");

module.exports = {
  findAllSurveys: function (req, res) {
    db.find({})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  },

  findSurveyById: function (id, res) {
    db.findById(id)
      .then(function (survey) {
        res.json(survey);
      })
      .catch(function (err) {
        res.json(err);
      });
  },

  createSurvey: function (survey) {
    db.create(survey)
      .then(function (x) {
        console.log(x);
      })
      .catch(function (err) {
        return console.log(err);
      });
  },
  addResponseToSurvey: function (surveyId, Response) {
    db.findByIdAndUpdate(surveyId, { $push: { responses: Response } })
      .then(function (x) {
        console.log(x);
      })
      .catch(function (err) {
        console.log(err);
      });
  },
};
