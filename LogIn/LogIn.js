document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    let username = document.getElementById('username').value;

    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        if (user.role === 'Admin') {

            window.location.href = '/Admin/adminHomePage.html';

        } else {

            window.location.href = '/Client/clientHomePage.html';

        }
        
    } else {

        alert('Invalid username or password.');

    }
    
});
