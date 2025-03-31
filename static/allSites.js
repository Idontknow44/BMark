function AddToBoard(checkbox) {
    const siteName = checkbox.getAttribute('data-site-name');
    const showBoard = checkbox.checked;

    fetch('/add_to_siteboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            siteName: siteName,
            showBoard: showBoard
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== 'success') {
            alert('Error updating site board.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// function openModal() {
//     document.getElementById("addSiteModal").style.display = "block";
// }

// function closeModal() {
//     document.getElementById("addSiteModal").style.display = "none";
// }

// window.onclick = function(event) {
//     let modal = document.getElementById("addSiteModal");
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// }