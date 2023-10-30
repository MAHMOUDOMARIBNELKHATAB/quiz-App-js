var registeredUser = localStorage.getItem("registeredUser");

if (registeredUser)
    registeredUser = JSON.parse(registeredUser);

var email = document.getElementById("email");
var password = document.getElementById("password");
var loginBtn = document.querySelector(".details button");

loginBtn.addEventListener('click', function (e) {
    if (!email.value || !password.value) {
        alert("Please enter email and password");
        return;
    } else if (!registeredUser) {
        alert("Unregistered email, please register first");
    } else if (email.value == registeredUser.email && password.value == registeredUser.password) {
        window.location.href = 'index.html';

    } else
        alert("Wrong email or password");
});
