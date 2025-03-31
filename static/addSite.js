function validateForm() {
    let condition = true;
    condition = validateSiteName() && condition;
    condition = validateSiteUrl() && condition;
    condition = validateImageUrl() && condition;

    if (!condition) {
        event.preventDefault();
    }

    return condition;
}

function validateSiteName() {
    let siteName = document.getElementById("siteName").value;
    let emSiteName = document.getElementById("emSiteName");
    let checkchars = /^[A-Za-z0-9]+$/;
    let hasLetter = /[A-Za-z]/.test(siteName);

    if (siteName.length >= 3 && checkchars.test(siteName) && hasLetter) {
        emSiteName.innerHTML = "";
        return true;
    } else {
        emSiteName.innerHTML = "* The site name must be at least 3 characters long and can only contain numbers and letters.";
        return false;
    }
}

function validateSiteUrl() {
    let siteUrl = document.getElementById("siteUrl").value;
    let emSiteUrl = document.getElementById("emSiteUrl");

    if (siteUrl.startsWith("https://")) {
        emSiteUrl.innerHTML = "";
        return true;
    } else {
        emSiteUrl.innerHTML = "* The site URL must start with \"https://\"";
        return false;
    }
}

function validateImageUrl() {
    let imageUrl = document.getElementById("imageUrl").value;
    let emImageUrl = document.getElementById("emImageUrl");

    if (imageUrl.startsWith("https://")) {
        emImageUrl.innerHTML = "";
        return true;
    } else {
        emImageUrl.innerHTML = "* The image URL must start with \"https://\"";
        return false;
    }
}

function deleteEr() {
    document.getElementById("emSiteName").innerHTML = "";
    document.getElementById("emSiteUrl").innerHTML = "";
    document.getElementById("emImageUrl").innerHTML = "";
}