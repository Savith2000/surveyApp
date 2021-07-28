const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ALLOWEDTYPES = ["text", "number", "rating"];

const SurveyQuestion = new Schema({
  question: { type: String, required: true, maxLength: 200, match: [/([A-z0-9\s])+/g, "Special characters are not allowed"] },
  responseType: {
    type: String,
    required: "Response type required",
    validate: {
      validator: (type) => ALLOWEDTYPES.includes(type),
      message: "Valid types are: text, number, rating",
    },
  },
});

const SurveySchema = new Schema({
  title: {
    type: String,
    match: [/([A-z0-9\s])+/g, "Special characters are not allowed"],
    required: "Survey title required",
    maxLength: 50,
  },
  creationDate: { type: Date, default: Date.now },
  questions: [SurveyQuestion],
  responses: {
    type: Schema.Types.ObjectId,
    ref: "ResponseList",
  },
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;
