document.addEventListener('DOMContentLoaded', () => {
    // Check the saved theme from localStorage and apply it on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark', savedTheme === 'dark');

    let currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!currentUser) {
        console.error('No current user found');
        window.location.href = '/index.html';
        return;
    }

    const maleEmoji = '/Assets/male.png';
    const femaleEmoji = '/Assets/female.png';
    document.getElementById('gender-icon').innerHTML = currentUser.gender === 'Male' ?
        `<img src="${maleEmoji}" alt="male-icon" width="30" height="30">` :
        `<img src="${femaleEmoji}" alt="female-icon" width="30" height="30">`;

    document.getElementById('username').textContent = currentUser.username;

    document.getElementById('sign-out').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/index.html';
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
});
