/* Functionality for Individual Survey Pages */

$("#submit").on("click", () => {
    let responses = [];
    const qLength = $("#submit").data("length").parseInt();
    const surveyId = $("#submit").data("id").parseInt();
    for (i = 0; i < qLength; i++) {
        responses += $(`#${i}`).val();
    }
    $.post(`/submitSurvey/${surveyId}`, responses).then((info) => {
        if (!info.error) {
            $("form").hide();
            $("#alerts").text(info.msg);
        } else {
            $("#alerts").text(info.msg);
        }
    }).fail((err) => {
        $("#alerts").text(err.statusCode);
    });
});