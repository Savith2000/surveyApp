const Survey = require("../models/Survey");
const surveyController = require("../controllers/surveyController");
const path = require("path");

module.exports = function (app) {
    app.get("/create-survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/createSurvey.html"));
    })

    app.get("/survey/:id", function (req, res) {
        // get survey using controller and req.params.id
        // Controller the config for creating the form as well as the responses
        // Generate and send back survey form
    });
}