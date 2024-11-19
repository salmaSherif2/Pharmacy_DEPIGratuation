function validateForm() {

    const username = document.getElementById('username').value.length >= 1 && document.getElementById('username').value.length <= 10;

    const email = isValidEmail(document.getElementById('email').value);

    const password = isValidPassword(document.getElementById('password').value);

    document.getElementsByTagName('button')[0].disabled = !(username && email && password);

}

document.getElementById('username').addEventListener('input', validateForm);

document.getElementById('email').addEventListener('input', validateForm);

document.getElementById('password').addEventListener('input', validateForm);

document.getElementById('username').addEventListener('input', (e) => {

    if (e.target.value === '') {

        document.getElementById('username').style.borderColor = 'rgb(4, 4, 64)';

        document.getElementById('msg-1').style.display = 'none';

        document.getElementById('username').style.marginBottom = '1rem';

    }

    else if (e.target.value.length > 0 && e.target.value.length < 10) {

        document.getElementById('username').style.borderColor = 'green';

        document.getElementById('msg-1').style.display = 'none';

        document.getElementById('username').style.marginBottom = '1rem';

    }

    else {

        document.getElementById('username').style.borderColor = 'red';

        document.getElementById('msg-1').style.display = 'block';

        document.getElementById('username').style.marginBottom = '1rem';

    }

});

function isValidEmail(input) {

    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);

}

document.getElementById('email').addEventListener('input', (e) => {

    if(e.target.value === '') {

        document.getElementById('email').style.borderColor = 'rgb(4, 4, 64)';

        document.getElementById('msg-2').style.display = 'none';

        document.getElementById('email').style.marginBottom = '1rem';

    }

    else if (isValidEmail(e.target.value)) {

        document.getElementById('email').style.borderColor = 'green';

        document.getElementById('msg-2').style.display = 'none';

        document.getElementById('email').style.marginBottom = '1rem';

    }

    else {

        document.getElementById('email').style.borderColor = 'red';

        document.getElementById('msg-2').style.display = 'block';

        document.getElementById('email').style.marginBottom = '1rem';

    }

});

function isValidPassword(input) {

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input);

}

document.getElementById('password').addEventListener('input', (e) => {

    if (e.target.value === '') {

        document.getElementById('password').style.borderColor = 'rgb(4, 4, 64)';

        document.getElementById('msg-3').style.display = 'none';

        document.getElementById('password').style.marginBottom = '1rem';

    }

    else if (isValidPassword(e.target.value)) {

        document.getElementById('password').style.borderColor = 'green';

        document.getElementById('msg-3').style.display = 'none';

        document.getElementById('password').style.marginBottom = '1rem';

    }

    else {

        document.getElementById('password').style.borderColor = 'red';

        document.getElementById('msg-3').style.display = 'block';

        document.getElementById('password').style.marginBottom = '1rem';

    }

});

document.querySelectorAll('input[name="role"]').forEach((input) => {

    input.addEventListener('change', function () {

        const adminKeyContainer = document.getElementById('admin-key-container');

        if (this.value === 'Admin') {

            adminKeyContainer.style.display = 'block';

        } else {

            adminKeyContainer.style.display = 'none';

        }

    });

});

document.querySelector('form').addEventListener('submit', (e) => {

    validateForm();

    e.preventDefault();

    let username = document.getElementById('username').value;

    let email = document.getElementById('email').value;

    let password = document.getElementById('password').value;

    let gender = document.querySelector('input[name="gender"]:checked').value;

    let role = document.querySelector('input[name="role"]:checked').value;
    
    if (role === 'Admin') {

        const adminKey = document.getElementById('admin-key').value;

        const correctAdminKey = 'SECRET_KEY';

        if (adminKey !== correctAdminKey) {

            document.getElementById('admin-key-msg').style.display = 'block';

            return;

        }

    }
    
    let users = JSON.parse(localStorage.getItem('users')) || []; 
    
    if (users.some(user => user.email === email)) {

        alert('User with this email already exists.');

        return;

    }
    
    users.push({ username, email, password, gender, role });

    localStorage.setItem('users', JSON.stringify(users));
    
    localStorage.setItem('loggedInUser', JSON.stringify({ username, gender, role }));
    
    if (role === 'Admin') {

        window.location.href = '/Admin/adminHomePage.html';

    } else {

        window.location.href = '/Client/clientHomePage.html';

    }

});