const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ALLOWEDTYPES = ["text", "number", "rating"];

const SurveyQuestion = new Schema({
  question: { type: String, required: true, maxLength: 200 },
  responseType: {
    type: String,
    required: "Response type required",
    validate: {
      validator: (type) => ALLOWEDTYPES.includes(type),
      //  validator: function (x) {
      //   console.log(x);
      // },
      message: "Valid types are: text, number, rating",
    },
  },
});

const SurveyResponse = new Schema({
  answers: [Schema.Types.Mixed],
  date: { type: Date, required: true },
});

const SurveySchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  creationDate: { type: Date, required: true },
  questions: [SurveyQuestion],
  responses: [SurveyResponse],
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;
