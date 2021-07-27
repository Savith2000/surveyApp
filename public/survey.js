/* Front End Survey Pages Functionality */

$("#submit").on("click", (e) => {
    e.preventDefault();
    let responses = [];
    const qLength = $("#submit").data("length");
    const surveyId = $("#submit").data("id");
    for (i = 0; i < qLength; i++) {
        responses += $(`#${i}`).val();
    }
    $.post(`/submitSurvey/${surveyId}`, responses).then((info) => {
        console.log(info);
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