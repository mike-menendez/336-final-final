$(document).ready(function() {
    $(".jumbotron").replaceWith('<div class = "jumbotron shadow">\n' +
        '<h1 class = "text-center">' + window.sessionStorage.getItem("user") + '</h1></div>');
});