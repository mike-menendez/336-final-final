$(document).ready(function() {
    // Get all Time Blocks
    $.ajax({
        url: "https://cst336-final-final-mmenendez.herokuapp.com/user/all",
        type: "POST",
        data: { u: sessionStorage.getItem("user") },
        success: function(result) {
            var x = '<div class = "card container shadow p-5">' +
                '<table><thead><tr><th style = "text-align:left">Block #</th>' +
                '<th style = "text-align: left>Day</th><th style = "text-align: left>Start</th>' +
                '<th style = "text-align: left>End</th><th style="text-align:left">Booked</th></tr></thead>';
            result.forEach(element => {
                x = x + '<tr><td style = "text-align:left>' + element.b_id + '</td>\n' +
                    '<td style = "text-align:left">' + element.day + '</td>' +
                    '<td style = "text-align:left">' + element.stime + '</td>' +
                    '<td style = "text-align:left">' + element.etime + '</td>';
                if (!element.booked) {
                    x = x + '<td style = "text-align: left">Not Booked</td>';
                } else {
                    x = x + '<td style = "text-align: left" class = "btn btn-error abc" id="' +
                        element.b_id + '">Delete</td>';
                }
            });
            x = x + "</tbody></table></div>";

            $(".lol").replaceWith(x);

            $(".abc").on("click", () => {
                var temp = this.id;
                $.ajax({
                    url: "https://cst336-final-final-mmenendez.herokuapp.com/user/del",
                    type: "POST",
                    data: { id: temp },
                    success: () => {
                        Swal.fire({
                            title: "Deleted Successfully",
                            icon: "success"
                        });
                    }
                });
            });
        }
    });
});