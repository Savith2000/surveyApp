const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    title: {
        type: String,
        required: "A valid survey title is required",
        match: [/([A-z0-9])+/g, "Special characters are not allowed"],
    },
    questions: [
        {
            name: {
                type: String,
                required: "A valid question name is required",
                match: [/([A-z0-9])+/g, "Special characters are not allowed"],
            },
            type: {
                type: String,
                required: "A valid question type is required",
                validate: [
                    function(input) {
                        let valid = true;
                        if (input !== "text" && input !== "number" && input !== "rating") {
                            valid = false;
                        }
                      return valid;
                    },
                    "Password should be longer."
                  ]
            }
        }
    ],
    responses: []
});

// Model
const Survey = mongoose.model("Survey", SurveySchema);
module.exports = Survey;