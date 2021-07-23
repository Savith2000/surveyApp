const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ALLOWEDTYPES = ["text", "number", "rating"];

const SurveyQuestion = new Schema({
  question: { type: String, required: true, maxLength: 200 },
  responseType: {
    type: String,
    required: "Response type required",
    validate: {
      validator: (type) => type in ALLOWEDTYPES,
      message: "Valid types are: text, number, rating",
    },
  },
});

const SurveyResponse = new Schema({
  answers: { type: [Schema.Type.Mixed] },
  date: { type: Date, required: true },
});

const SurveySchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  questions: [SurveyQuestion],
  responses: [SurveyResponse],
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;
