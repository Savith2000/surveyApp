const Survey = require("../models/Survey");
const controller = require("../controllers/surveyController");
const path = require("path");
const fs = require('fs')

module.exports = function (app) {
    app.get("/create-survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/createSurvey.html"));
    })

    app.get("/survey/:id", function (req, res) {
        controller.findSurveyById(req.params.id).then((survey) => {
            let questions = "";
            let metrics = "<table class='survey-metrics'><thead><tr>";
            survey.questions.forEach((q, i) => {
                let input;
                input = `<label for="${i}>${q.question}</label>"`;
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
                metrics += `<th>${q.question}</th>`;
            });
            metrics += `</tr></thead>`;
            survey.responses.forEach((response, i) => {
                metrics += `<tr>`;
                response.forEach((answer) => {
                    metrics += `<td>${answer}</td>`;
                });
                metrics += `</tr>`;
            });
            metrics += `</thead>`;
            let form;
            fs.readFile("../public/survey.js", "utf8", function(error, js) {
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
    <h1 class="form-title"></h1>
    <form>
    ${questions}
        <input value="submit" id="submit" data-length="${questions.length}" data-id="${survey._id}">
    </form>
    <div id="alerts"></div>
    <data>
        <summary>View Survey Response Metrics</summary>
    ${metrics}
    </data>
    ${js}
</body>
</html>
            `;
            });
            res.send(form);
        });
    });
}