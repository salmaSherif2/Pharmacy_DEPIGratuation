function getProducts() {
    return JSON.parse(localStorage.getItem('productsLists')) || [];
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}


document.addEventListener('DOMContentLoaded', () => {

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


});

