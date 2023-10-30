var fullName = document.getElementById("name");
var email = document.getElementById("email");
var username = document.getElementById("username");
var password = document.getElementById("password");
var passwordConfirm = document.getElementById("passwordConfirm");
var registerBtn = document.querySelector('button');

registerBtn.addEventListener('click', function (e) {
    if (!fullName.value || !email.value || !username.value || !password.value || !passwordConfirm.value) {
        alert("Please fill all the fields");
        return;
    }

    if (passwordConfirm.value !== password.value) {
        alert("Password does not match, please check");
        return;
    }

    var registeredUser = {
        name: fullName.value,
        email: email.value,
        username: username.value,
        passwordConfirm: passwordConfirm.value,
        password: password.value
    }

    localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
    localStorage.setItem("currentUser", null);
    window.location.href = 'login.html';
});
