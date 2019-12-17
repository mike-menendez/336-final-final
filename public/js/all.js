$(document).ready(function() {
    // Get all Time Blocks
    $.ajax({
        url: "https://cst336-final-final-mmenendez.herokuapp.com/user/all",
        type: "POST",
        data: { u: sessionStorage.getItem("user") },
        success: function(result) {
            result.forEach(element => {
                console.log(element);
            });
        }

    });
});