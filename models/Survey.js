const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveyQuestion = new Schema({
  question: { type: String, required: true },
  responseType: { type: String, required: true },
});

const SurveyResponse = new Schema({
  answers: { type: [Schema.Type.Mixed] },
  date: { type: Date, required: true },
});

const SurveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [SurveyQuestion],
  responses: [SurveyResponse],
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;
