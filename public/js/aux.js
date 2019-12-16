// Set cart value and auth status

$(document).ready(function() {
    var auth = sessionStorage.getItem("auth");

    if (auth == "true") {
        $(".sin").text(function() { return "Sign Out"; });
        $(".sin").attr("href", "/");
        $(".sin").on("click", function() {
            sessionStorage.removeItem("auth");
            Swal.fire({
                title: "You have been signed out\nTaking you home!",
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('b')
                            .textContent = Swal.getTimerLeft();
                    }, 100);
                },
                onClose: () => {
                    clearInterval(timerInterval);
                }
            }).then(function() {
                setTimeout(() => { window.location.replace("https://cst336-final-final-mmenendez.herokuapp.com/"); }, 2000);
            });
        });
    } else {
        $(".ap").remove();
    }

    $(".lbtn").on("click", function() {
        var username = $(".uname").val();
        console.log("Uname:", username);
        var password = $(".pass").val();
        console.log("Pass:", password);

        $.ajax({
            url: "https://cst336-final-final-mmenendez.herokuapp.com/auth",
            type: "POST",
            data: { username: username, password: password },
            success: function(res) {
                console.log(res.auth);
                var x;
                if (res.auth == true) {
                    x = {
                        title: "Login Success!",
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: 'Take Me Home'
                    };
                    sessionStorage.setItem("auth", "true");
                } else {
                    x = {
                        title: "Login Failure",
                        text: 'Invalid Username or Password',
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                    };
                    delete sessionStorage.auth;
                }
                Swal.fire(x).then(function() {
                    if (x.icon == 'error') {
                        window.location.reload();
                    } else {
                        window.location.replace("https://cst336-final-final-mmenendez.herokuapp.com/");
                    }
                });
            }
        });
    });
});

$(".reg").on("click", () => {
    var x = {
        uname: $(".uname").val(),
        pass: $(".pass").val()
    };
    $.ajax({
        url: "https://cst336-final-final-mmenendez.herokuapp.com/auth/register",
        type: "POST",
        data: x,
        success: function(res) {
            if (res.valid == "ok") {
                x = {
                    title: "Register Successful",
                    text: "Redirecting you to your homepage",
                    icon: "success"
                };
            } else {
                x = {
                    title: "Error",
                    text: "User already exists",
                    icon: "error"
                };
            }
            Swal.fire(x).then(() => {
                if (x.icon == 'error') {
                    window.location.reload();
                } else {
                    sessionStorage.put("auth", "true");
                }
            }).then(() => {
                window.location.replace("https://cst336-final-final-mmenendez.herokuapp.com/user");
            });
        }
    });
});