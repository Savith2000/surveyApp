/* Front End Survey Pages Functionality */

// Survey Submission
$("#submit").on("click", (e) => {
    e.preventDefault();
    let responses = [];
    const qLength = $("#submit").data("length");
    const surveyId = $("#submit").data("id");
    for (i = 0; i < qLength; i++) {
        responses.push($(`#${i}`).val());
    }
    $.post(`/submitSurvey/${surveyId}`, {responses: responses}).then((info) => {
        console.log(info);
        if (!info.error) {
            $("form").hide();
            $("#alerts").text(info.msg);
            $("#alerts").removeClass("alert").addClass("good");
        } else {
            $("#alerts").text(info.msg);
        }
    }).fail((err) => {
        $("#alerts").text("There was an error submitting your response");
    });
});

// Metrics
let metricsOpened = false;
$("#getMetrics").on("click", () => {
    const id = $("#getMetrics").data("id");
    if (!metricsOpened) { // Only allows user to make one metrics request
    metricsOpened = true;
    $.get("/metrics/" + id).then((metrics) => {
        console.log(metrics);
        $("#surveyMetrics").append(metrics);
    }).fail(() => {
        $("#surveyMetrics").append("There was an error retreiving survey responses");
    })
}
});