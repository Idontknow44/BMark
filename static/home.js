document.addEventListener('keydown', (event) => {
    const keyName = event.key;
  
    if (keyName === 'ArrowLeft') {
        triggerLeftArrowTransition();
        switchLeft();
    }

    if (keyName === 'ArrowRight') {
        triggerRightArrowTransition();
        switchRight();
    }
    if (keyName === 'Space' || keyName === 'Enter') {
        openSiteUrl();
    }
}, false);

function openSiteUrl() {
    let siteUrl = document.getElementById("siteUrl");
    let output = siteUrl.href;

    if (output) {
        window.location.href = output;
    }
}
let currentSite = 1;

function switchRight() {
    currentSite++;
    if (currentSite > 5) { 
        currentSite = 1;
    }
    siteImage();
    siteUrl();
    site()
}

function switchLeft() {
    currentSite--;
    if (currentSite < 1) { 
        currentSite = 5;
    }
    siteImage();
    siteUrl();
    site()
}

function site() {
    let output = "";

    if (currentSite == 1) {
        if (siteName1j == "none") {
            output = "site 1";
        } else {
            output = siteName1j;
        }
    } else if (currentSite == 2) {
        if (siteName2j == "none") {
            output = "site 2";
        } else {
            output = siteName2j;
        }
    } else if (currentSite == 3) {
        if (siteName3j == "none") {
            output = "site 3";
        } else {
            output = siteName3j;
        }
    } else if (currentSite == 4) {
        if (siteName4j == "none") {
            output = "site 4";
        } else {
            output = siteName4j;
        }
    } else if (currentSite == 5) {
        if (siteName5j == "none") {
            output = "site 5";
        } else {
            output = siteName5j;
        }
    }

    return output;
}

function siteUrl() {
    let siteUrl = document.getElementById("siteUrl");
    let output = "";

    if (currentSite == 1) {
        if (url1j == "none") {
            output = "";
        } else {
            output = url1j;
        }
    }
    else if (currentSite == 2) {
        if (url2j == "none") {
            output = "";
        } else {
            output = url2j;
        }
    }
    else if (currentSite == 3) {
        if (url3j == "none") {
            output = "";
        } else {
            output = url3j;
        }
    }
    else if (currentSite == 4) {
        if (url4j == "none") {
            output = "";
        } else {
            output = url4j;
        }
    }
    else if (currentSite == 5) {
        if (url5j == "none") {
            output = "";
        } else {
            output = url5j;
        }
    }
    siteUrl.href = output;
}

function siteImage() {
    let siteImageElement = document.getElementById("siteImage");
    let noSite = document.getElementById("noSite");
    let siteName = document.getElementById("siteName");
    let bg = null;
    let output = bg;

    if (currentSite == 1) {
        output = (image1j == "none") ? null : image1j;
    }
    else if (currentSite == 2) {
        output = (image2j == "none") ? null : image2j;
    }
    else if (currentSite == 3) {
        output = (image3j == "none") ? null : image3j;
    }
    else if (currentSite == 4) {
        output = (image4j == "none") ? null : image4j;
    }
    else if (currentSite == 5) {
        output = (image5j == "none") ? null : image5j;
    }

    siteName.innerHTML = site();
    noSite.innerHTML = (output == null) ? "no site inserted" : "";

    if (output !== null) {
        siteImageElement.src = output;
        siteImageElement.classList.add("show");  
    } else {
        siteImageElement.classList.remove("show");
    }
}

let siteName1j, url1j, image1j;
let siteName2j, url2j, image2j;
let siteName3j, url3j, image3j;
let siteName4j, url4j, image4j;
let siteName5j, url5j, image5j;

fetch('/get_fav_sites')
    .then(response => response.text()) 
    .then(jsCode => {
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = jsCode;
        document.body.appendChild(scriptElement);

        // Assign fetched variables to global variables
        siteName1j = siteName1;
        url1j = url1;
        image1j = image1;

        siteName2j = siteName2;
        url2j = url2;
        image2j = image2;

        siteName3j = siteName3;
        url3j = url3;
        image3j = image3;

        siteName4j = siteName4;
        url4j = url4;
        image4j = image4;

        siteName5j = siteName5;
        url5j = url5;
        image5j = image5;
        
        siteImage();
        site();
        siteUrl()
    })
    .catch(error => {
        console.error('Error fetching favorite sites:', error);
    });

// Arrow transition functions
function triggerRightArrowTransition() {
    const rightArrow = document.querySelector('.right-arrow');
    if (rightArrow) {
        rightArrow.classList.add('active');
        setTimeout(() => {
            rightArrow.classList.remove('active');
        }, 150);
    }
}

function triggerLeftArrowTransition() {
    const leftArrow = document.querySelector('.left-arrow');
    if (leftArrow) {
        leftArrow.classList.add('active');
        setTimeout(() => {
            leftArrow.classList.remove('active');
        }, 150);
    }
}
