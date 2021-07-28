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
            let metricsH = "<table class='survey-metrics'><thead><tr>";
            survey.questions.forEach((q, i) => {
                let input;
                input = `<br><label for="${i}">${q.question}</label>`;
                switch (q.responseType) {
                    case "text":
                    input += `<input name="${i}" id="${i}" type="text" placeholder="Enter text only here...">`;
                    break;
                    case "number":
                    input += `<input name="${i}" id="${i}" type="number" placeholder="Numbers only here...">`;
                    break;
                    case "rating":
                    input += `<input name="${i}" id="${i}" type="number" min="1" max="5" value="3">`;
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
    <title>${survey.title}</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>
<body>
    <h1 class="form-title">${survey.title}</h1>
    <form>
    ${questions}
        <br><input value="submit" type="submit" id="submit" data-length="${questions.length}" data-id="${survey._id}">
    </form>
    <div id="alerts"></div>
    <details>
        <summary data-id="${survey._id}">View Survey Response Metrics</summary>
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
        controller.getSurveyResponseListById(req.params.id).then((list) => {
        let metrics = "";
        list.forEach((response, i) => {
            metrics += `<tr>`;
            response.forEach((answer) => {
                metrics += `<td>${answer}</td>`;
            });
            metrics += `</tr>`;
        });
        res.send(metrics);
    });
})
}