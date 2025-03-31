function validateForm() {
    let condition = true;
    condition = condition && validateUsername();
    condition = condition && validatePassword();

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
        emUsername.innerHTML = "* Username must be at least 3 characters long and can only have  has numbers and letters.";
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
function deleteEr() {
    let emUsername = document.getElementById("emUsername");
    let emPassword = document.getElementById("emPassword");
    let emEnd = document.getElementById("emEnd");

    emUsername.innerHTML = "";
    emPassword.innerHTML = "";
    emEnd.innerHTML = "";
}