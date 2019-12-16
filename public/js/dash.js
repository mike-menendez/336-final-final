import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

$(document).ready(function() {
    $(".jumbotron").replaceWith('<div class = "jumbotron shadow">\n' +
        '<h1 class = "text-center">' + window.sessionStorage.getItem("user") + '\'s homepage!</h1></div>');

    // delete item by id
    $(".rmrf").on("click", () => {

    });
    // Image upload
    $(".bk").on("click", () => {

    });
    // View all by user id
    $(".view_all").on("click", () => {

    });
    // Make new timeslot
    $(".add_new").on("click", () => {
        $(".add-new").show();
    });
    $(".close").on("click", () => {
        $(".add-new").hide();
    });
    $(".sub_add-new").on("click", () => {
        var x;
        var start = $(".start-add").val();
        var end = $(".end-add").val();
        var date = $(".date-add").val();
        $.ajax({
            url: "",
            data: { s: start, e: end, d: date, u: sessionStorage.getItem("user") },
            success: function(res) {
                Swal.fire({
                    title: "Success",
                    icon: "success"
                });
                $(".add-new").hide();
            }
        })
    })
});