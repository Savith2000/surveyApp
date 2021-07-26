const Survey = require("../models/Survey");
const controller = require("../controllers/surveyController");

module.exports = function (app) {
    app.post("/createSurvey", function(req, res) {
        controller.createSurvey(req.body).then(() => {
            res.json({error: false, msg: "Your survey was successfully submitted! (!! Send link too !!)"});
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
        let textRgx = /([^A-z0-9\s'-.,])+/g;
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
            res.json({
                error: true, 
                msg: "Please fill out all fields correctly"
            });
        } else {
            controller.addResponseToSurvey(req.params.id, ans).then(() => {
                res.json({error: false, msg: "Your response was successfully submitted!"});
            }
            ).catch((err) => {
                res.json({
                    error: true, 
                    msg: err
                });
            });
        }
        }).catch((err) => {
            res.json({error: true, msg: err});
        })
    });
}