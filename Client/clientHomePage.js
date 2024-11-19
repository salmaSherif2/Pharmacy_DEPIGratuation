// Helper function to get products from localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Helper function to save products to localStorage
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

    let genderIcon = document.getElementById('gender-icon');

    if (currentUser.gender === 'Male') {

        genderIcon.innerHTML = `<img src="${maleEmoji}" alt="male-icon" width="30" height="30">`;

    } else if (currentUser.gender === 'Female') {

        genderIcon.innerHTML = `<img src="${femaleEmoji}" alt="female-icon" width="30" height="30">`;

    }

    let usernameElement = document.getElementById('username');

    usernameElement.textContent = currentUser.username;

    const signOutButton = document.getElementById('sign-out');

    signOutButton.addEventListener('click', () => {

        localStorage.removeItem('loggedInUser');

        window.location.href = '/index.html';

    });

    const themeToggleButton = document.getElementById('theme-toggle');

    themeToggleButton.addEventListener('click', () => {

        document.body.classList.toggle('dark');

        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';

        localStorage.setItem('theme', currentTheme);

    });

    const savedTheme = localStorage.getItem('theme') || 'light';

    document.body.classList.toggle('dark', savedTheme === 'dark');

    displayInventory();

    updateCartCount();

    const cartButton = document.getElementById('cart-btn');

    const cartSidebar = document.getElementById('cart-sidebar');

    const closeCartButton = document.getElementById('close-cart');

    cartButton.addEventListener('click', () => {

        cartSidebar.classList.add('active');

        displayCartItems();

    });

    closeCartButton.addEventListener('click', () => {

        cartSidebar.classList.remove('active');

    });

});

function displayInventory() {

    var productContainer = JSON.parse(localStorage.getItem("productsList")) || [];
    console.log(getProducts());


    var content = ``;

    for (var i = 0; i < productContainer.length; i++) {

        content += `

        <tr>

            <td>${i + 1}</td>

            <td>${productContainer[i].name}</td>

            <td>${productContainer[i].count}</td>

            <td>${productContainer[i].price}</td>

            <td>${productContainer[i].category}</td>

            <td>${productContainer[i].desc}</td>

            <td><button class="add-to-cart" data-index="${i}">Add to Cart</button></td>

        </tr>`;

    }

    document.getElementById("inventoryContent").innerHTML = content;

    addToCartButtons();

}
function addToCartButtons(){
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

}

function addToCart(event) {
    const index = event.target.getAttribute('data-index');
    let products = JSON.parse(localStorage.getItem("productsList")) || [];
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let productInCart = cartItems.find(item => item.name === products[index].name);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        let productToAdd = { ...products[index], quantity: 1 };
        cartItems.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalQuantity;
}
function updateCartQuantity(event) {
    const index = event.target.getAttribute('data-index');
    const action = event.target.getAttribute('data-action');
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (action === 'increase') {
        cartItems[index].quantity += 1;
    } else if (action === 'decrease' && cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
    updateCartCount();
}


function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContent = '';

    cartItems.forEach((item, index) => {
        cartContent += `
            <li>
                ${item.name} - ${item.price} (Quantity: ${item.quantity})
                <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                <button data-index="${index}" class="remove-item">Remove</button>
            </li>`;
    });

    document.getElementById('cart-items').innerHTML = cartContent;

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', updateCartQuantity);
    });
}
function removeFromCart(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
    updateCartCount();
}


//search input 

const searchInput=document.getElementById('searchInput');
var productContainer = JSON.parse(localStorage.getItem("productsList")) || [];

searchInput.onkeyup=function(){
    var addTable=``;
    for( var i=0 ; i<productContainer.length ; i++)
        {
            if(productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
            {
                addTable+=`<tr>
                                    <td>${i}</td>
                                    <td>${productContainer[i].name}</td>
                                    <td>${productContainer[i].count}</td>
                                    <td>${productContainer[i].price}</td>
                                    <td>${productContainer[i].category}</td>
                                    <td>${productContainer[i].desc}</td>
                                    <td><button class="add-to-cart" data-index="${i}">Add to Cart</button></td>           
        </tr>
        `
        
            }
        }
    document.getElementById("inventoryContent").innerHTML=addTable;
    displayCartItems();
    addToCartButtons();



}

