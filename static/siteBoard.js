document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.leaderboard-table tbody tr.board_site_link');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const url = row.getAttribute('data-href');
            window.location.href = url;
        });
        row.style.cursor = 'pointer'
    });
});
// function truncateString(str, maxLength = 36) {
//   if (str.length <= maxLength) {
//     return str;
//   }
//   return str.substring(0, maxLength) + "...";
// }

// const links = document.querySelectorAll('a.board_site_link');
// links.forEach(link => {
//     const truncatedText = truncateString(link.textContent);
//     link.textContent = truncatedText;
// });