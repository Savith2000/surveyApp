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
                    input += `<input name="${i}" id="${i}" type="text" placeholder="Enter text only here...">`;
                    break;
                    case "number":
                    input += `<input name="${i}" id="${i}" type="number" placeholder="Enter numbers only here...">`;
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
    <title>${survey.title.trim()} | Survey App</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <style>
      .form-title{
        color: #91bad6;
        font-size: 60px;
        text-align: center;
        font-family: "Convergence", sans-serif;
        margin-top: 2%;
      }

      #line{
        width: 80%;
      }

      input {
      width: 70%;
      font-size: 15px;
      padding: 12px 20px;
      margin: 15px 15px 15px 15%;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-family: "Convergence", sans-serif;
      color: #91bad6;
    }

    input[type=submit] {
      width: 150px;
      background-color: #91bad6;
      color: white;
      padding: 14px 20px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 20px;
      margin-top: 30px;
    }

    input[type=submit]:hover {
      background-color: #5099c9;
    }
    label{
    margin-top: 20px;
      font-family: "Convergence", sans-serif;
      font-size: 30px;
      color: #5099c9;
      display: block;
      margin-left: 15%;
      margin-right: 15%;
    }

    .survey-metrics{
        font-size: 20px;
        text-align: center;
        font-family: "Convergence", sans-serif;
        color: #91bad6;
        margin: auto;
        padding: 30px;
    }

    summary{
      margin-top: 1%;
      font-size: 30px;
      font-family: "Convergence", sans-serif;
      color: #5099c9
    }
    </style>
</head>
<body>
    <h1 class="form-title">${survey.title}</h1>
    <hr id="line">
    <form style="width: 100%;">
    ${questions}
        <br><input value="Submit" type="submit" id="submit" data-length="${survey.questions.length}" data-id="${survey._id}">
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