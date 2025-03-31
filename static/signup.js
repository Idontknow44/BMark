function validateForm() {
    let condition = true;
    condition = condition && validateUsername();
    condition = condition && validatePassword();
    condition = condition && validatePasswordCheck();
    condition = condition && validateName();
    condition = condition && validateFamilyName();
    condition = condition && validateEmail();

    if (!condition) {
        event.preventDefault();
    }

    return condition;
}

function validateUsername() {
    let username = document.getElementById("username").value;
    let emUsername = document.getElementById("emUsername");
    let checkchars = /^[A-Za-z0-9]+$/;
    let hasLetter = /[A-Za-z]/.test(username);

    if (username.length >= 3 && checkchars.test(username) && hasLetter) {
        emUsername.innerHTML = "";
        return true;
    }
    else {
        emUsername.innerHTML = "* Username must be at least 3 characters long and can only have numbers and letters.";
        return false;
    }
}
function validatePassword() {
    let password = document.getElementById("password").value;
    let emPassword = document.getElementById("emPassword");
    let checkchars = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/;
    let hasBigLetter = /[A-Z]/.test(password);
    let hasSmallLetter = /[a-z]/.test(password);
    let hasSpace = /\s/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 6 && password.length <= 15 && checkchars.test(password) && hasBigLetter && hasSmallLetter && hasNumber && hasSpecialChar && !hasSpace) {
        emPassword.innerHTML = "";
        return true;
    }
    else {
        emPassword.innerHTML = "* Password must be between 6-15 characters long and contain both uppercase and lowercase letters, at least one number, at least one special character and no spaces.";
        return false;
    }
}
function validatePasswordCheck() {
    let passwordCheck = document.getElementById("passwordCheck").value;
    let password = document.getElementById("password").value;
    let emPasswordCheck = document.getElementById("emPasswordCheck");
    
    if (passwordCheck == password) {
        emPasswordCheck.innerHTML = "";
        return true;
    }
    else {
        emPasswordCheck.innerHTML = "* Passwords must be the same";
        return false;
    }
}
function validateName() {
    let name = document.getElementById("name").value;
    let emName = document.getElementById("emName");

    if (name.length >= 2) {
        emName.innerHTML = "";
        return true;
    }
    else {
        emName.innerHTML = "* Name must be at least 2 characters long.";
        return false;
    }
}
function validateFamilyName() {
    let familyName = document.getElementById("familyName").value;
    let emFamilyName = document.getElementById("emFamilyName");
    
    if (familyName.length >= 2) {
        emFamilyName.innerHTML = "";
        return true;
    }
    else {
        emFamilyName.innerHTML = "* Last name must be at least 2 characters long.";
        return false;
    }
}
function validateEmail() {
    let email = document.getElementById("email").value;
    let emEmail = document.getElementById("emEmail");   
    let checkchars = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let atIndex = email.indexOf('@');
    let dotIndex = email.lastIndexOf('.');
    
    if (checkchars.test(email) && atIndex > 0 && dotIndex > atIndex + 1) {

        emEmail.innerHTML = "";
        return true;
    } else {
        emEmail.innerHTML = "* Invalid email format.";
        return false;
    }
}
function deleteEr() {
    let emUsername = document.getElementById("emUsername");
    let emPassword = document.getElementById("emPassword");
    let emPasswordCheck = document.getElementById("emPasswordCheck");
    let emName = document.getElementById("emName");
    let emFamilyName = document.getElementById("emFamilyName");
    let emEmail = document.getElementById("emEmail");
    let emEnd = document.getElementById("emEnd");

    emUsername.innerHTML = "";
    emPassword.innerHTML = "";
    emPasswordCheck.innerHTML = "";
    emName.innerHTML = "";
    emFamilyName.innerHTML = "";
    emEmail.innerHTML = "";
    emEnd.innerHTML = "";
}