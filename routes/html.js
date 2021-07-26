const db = require("../models");
const { surveyController } = require("../controllers");

module.exports = function (app) {
    app.get("/survey/:id", function (req, res) {
        // get survey using controller and req.params.id
        // Controller the config for creating the form as well as the responses
    });
}