const Survey = require("../models/Survey");
const controller = require("../controllers/surveyController");

module.exports = function (app) {
    app.post("/createSurvey", function(req, res) {
        controller.createSurvey(req.body).then((data) => {
            res.json({error: false, msg: `Your survey was successfully submitted! It can be accessed `, link: data._id});
        }
        ).catch((err) => {
            res.json({error: true, msg: err});
        })
    });

    app.post("/submitSurvey/:id", function(req, res) {
        // Get Corresponding Survey (Will be replaced by finding in db using req.params.id once controllers done):
        controller.findSurveyById(req.params.id).then((survey) => {
        // Validate Length
        const qs = survey.questions;
        const ans = req.body.responses;
        let valid = true;
        if (qs.length !== ans.length) {
            valid = false;
        }
        // Validate based on Type
        let textRgx = /([^A-z0-9\s'-.,!?])+/g;
        let numRgx = /([^0-9])+/g;
        let ratingRgx = /([^1-5])+/g;
        ans.forEach((a, i) => {
            let resType = qs[i].responseType;
            if (a.trim() == "") {
                valid = false;
            }
            switch (resType) {
                case "text":
                if (a.match(textRgx)) {
                    valid = false;
                }
                break;
                case "number":
                if (a.match(numRgx)) {
                    valid = false;
                }
                break;
                case "rating":
                if (a.match(ratingRgx) || a.length !== 1) {
                    valid = false;
                }
                break;
            }
        });
        if (!valid) {
            res.json({
                error: true, 
                msg: "Please fill out all fields correctly. Special characters are not allowed"
            });
        } else {
            controller.addResponseToSurveyBySurveyId(req.params.id, ans).then(() => {
                res.json({error: false, msg: "Your response was successfully submitted!"});
            }
            ).catch((err) => {
                res.json({
                    error: true, 
                    msg: "There was an error submitting your response to the database"
                });
            });
        }
        }).catch((err) => {
            res.json({error: true, msg: "500: Internal Server Error"});
        })
    });
}