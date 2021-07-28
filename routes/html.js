const Survey = require("../models/Survey");
const controller = require("../controllers/surveyController");
const path = require("path");
const fs = require('fs')

module.exports = function (app) {
    app.get("/create-survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/createSurvey.html"));
    })

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    })

    app.get("/survey/:id", function (req, res) {
        controller.findSurveyById(req.params.id).then((survey) => {
            let questions = "";
            let metricsH = "<table class='survey-metrics' id='surveyMetrics'><thead><tr>";
            survey.questions.forEach((q, i) => {
                let input;
                input = `<br><label for="${i}">${q.question}</label>`;
                switch (q.responseType) {
                    case "text":
                    input += `<input name="${i}" id="${i}" type="text" placeholder="Enter text here...">`;
                    break;
                    case "number":
                    input += `<input name="${i}" id="${i}" type="number" placeholder="Enter only numbers here...">`;
                    break;
                    case "rating":
                    input += `<input name="${i}" id="${i}" type="number" min="1" max="5" placeholder="Rate from 1 to 5">`;
                    break;
                }
                questions += input;
                metricsH += `<th>${q.question}</th>`;
            });
            metricsH += `</tr></thead></table>`;
            let form;
            const frontendJSPath = path.join(__dirname, "../public/survey.js");
            fs.readFile(frontendJSPath, "utf8", function(error, file) {
            // Bug: fs returning undefined (fix later)
            form = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${survey.title.trim()} | Survey App</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link href="/survey.css" rel="stylesheet" type="text/css">
</head>
<body>
    <h1 class="form-title">${survey.title}</h1>
    <form style="width: 100%;">
    ${questions}
        <br><input value="Submit" type="submit" id="submit" data-length="${survey.questions.length}" data-id="${survey._id}">
        <div class="note">Note: All responses are public, never submit any personal or confidential information</div>
    </form>
    <div id="alerts" class="note alert"></div>
    <details id="metrics">
        <summary data-id="${survey._id}" id="getMetrics">View Survey Responses</summary>
        ${metricsH}
    </details>
    <script>${file}</script>
</body>
</html>
            `;
            res.send(form);
            });
        });
    });

    app.get("/metrics/:id", function (req, res) {
        controller.getResponseListBySurveyId(req.params.id).then((list) => {
        let metrics = "";
        list.forEach((response, i) => {
            metrics += `<tr>`;
            response.answers.forEach((answer) => {
                metrics += `<td>${answer}</td>`;
            });
            metrics += `</tr>`;
        });
        res.send(metrics);
    });
})
}