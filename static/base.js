const body = document.body;
const darkModeToggle = document.getElementById('darkMode');
const all = document.getElementById('all');
const siteNameLink = document.getElementById('siteNameLink');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// function toggleDarkMode() {
    
    
//     console.log('toggleDarkMode called');
    
//     body.classList.toggle('dark');
//     if (all) {
//         all.classList.toggle('dark');
//     }

//     console.log('body has dark class:', body.classList.contains('dark'));

//     // Save the dark mode state in localStorage
//     if (body.classList.contains('dark')) {
//         localStorage.setItem('darkMode', 'true');
//     } else {
//         localStorage.removeItem('darkMode');
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    // if (localStorage.getItem('darkMode') === 'true') {
    //     body.classList.add('dark');
    //     if (all) {
    //         all.classList.add('dark');
    //     }
    // } else {
    //     body.classList.remove('dark');
    //     if (all) {
    //         all.classList.remove('dark');
    //     }
    // }

    // if (darkModeToggle) {
    //     darkModeToggle.addEventListener('click', toggleDarkMode);
    // } else {
    //     console.warn('Dark mode toggle button not found');
    // }

    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Clicked item text:', item.textContent);
             ChangeSites(item);
        });
    });
});


function removeSitesOption() {
    const defaultOptions = ['defaultOption1', 'defaultOption2', 'defaultOption3', 'defaultOption4', 'defaultOption5'];
    
    defaultOptions.forEach(optionId => {
        const element = document.getElementById(optionId);
        if(element) {
            element.style.display = 'none';
        }
    });
}

function validateForm() {
    let dropdown1 = document.getElementById("dropdown1");
    let dropdown2 = document.getElementById("dropdown2");
    let dropdown3 = document.getElementById("dropdown3");
    let dropdown4 = document.getElementById("dropdown4");
    let dropdown5 = document.getElementById("dropdown5");

    if (dropdown1.value === "" || dropdown2.value === "" || dropdown3.value === "" || dropdown4.value === "" || dropdown5.value === "") {
        alert("Please fill in all fields");
        return false;
    }
    return true;
}