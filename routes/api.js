const Survey = require("../models/Survey");
const surveyController = require("../controllers/surveyController");

module.exports = function (app) {
    app.post("/createSurvey", function(req, res) {
        /* Post to survey controller: create survey */
    });

    app.post("/submitSurvey/:id", function(req, res) {
        // Demo req
        const demoReq = {
            responses: [
                {
                    input: "6",
                }
                // etc...
            ]
        }
        // Get Corresponding Survey (Will be replaced by finding in db using req.params.id once controllers done):
        const demoSurvey = {
            title: "Demo Survey (No DB Controllers made yet)",
            creationDate: "7/23/21",
            questions: [
                {
                    question: "What is your favourite Color?",
                    responseType: "rating"
                }
                // etc...
            ]
        }
        // Validate Length
        const qs = demoSurvey.questions;
        const ans = demoReq.responses;
        let valid = true;
        if (qs.length !== ans.length) {
            valid = false;
        }
        // Validate based on Type
        let textRgx = /([^A-z0-9\s])+/g;
        let numRgx = /([^0-9])+/g;
        let ratingRgx = /([^1-5])+/g;
        ans.forEach((a, i) => {
            let resType = qs[i].responseType;
            switch (resType) {
                case "text":
                if (a.input.match(textRgx)) {
                    valid = false;
                }
                break;
                case "number":
                if (a.input.match(numRgx)) {
                    valid = false;
                }
                break;
                case "rating":
                if (a.input.match(ratingRgx) || a.input.length !== 1) {
                    valid = false;
                }
                break;
            }
        });
        if (!valid) {
            res.send("Could not process invalid request");
        } else {
            /* Submit to survey submission controller */
        }
    });
}