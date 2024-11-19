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

    genderIcon.innerHTML = currentUser.gender === 'Male' 
        ? `<img src="${maleEmoji}" alt="male-icon" width="30" height="30">`
        : `<img src="${femaleEmoji}" alt="female-icon" width="30" height="30">`;

    document.getElementById('username').textContent = currentUser.username;

    document.getElementById('sign-out').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/index.html';
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });

    loadProducts();
    setupEventListeners();
});

const ProductName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDesc = document.getElementById("productDesc");
const ProductCount = document.getElementById("productCount");
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addProduct');
const inventoryContent = document.getElementById("inventoryContent");
const nameAlert=document.getElementById('nameAlert');

const countAlert=document.getElementById('countAlert');

const priceAlert=document.getElementById('priceAlert');

const categoryAlert=document.getElementById('categoryAlert');

let productContainer = JSON.parse(localStorage.getItem('productsList')) || [];
let currentIndex = null;

function setupEventListeners() {
    addBtn.addEventListener('click', addOrUpdateProduct);
    searchInput.addEventListener('keyup', filterProducts);
}

function loadProducts() {
    displayProducts(productContainer);
}

function displayProducts(products) {
    inventoryContent.innerHTML = products.map((product, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.count}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.desc}</td>
            <td>
                <i class="fa-solid fa-pencil icon" onclick="editProduct(${index})"></i>
                <i class="fa-solid fa-trash-can icon" onclick="deleteProduct(${index})"></i>
            </td>
        </tr>
    `).join('');

}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = productContainer.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function addOrUpdateProduct() {
    const name = ProductName.value;
    const count = ProductCount.value;
    const price = productPrice.value;
    const category = productCategory.value;
    const desc = productDesc.value;

    if (currentIndex !== null) {
        productContainer[currentIndex] = { name, count, price, category, desc };
        currentIndex = null;
        addBtn.textContent = 'Add Product';
    } else {
        productContainer.push({ name, count, price, category, desc });
    }

    localStorage.setItem('productsList', JSON.stringify(productContainer));
    clearInputs();
    loadProducts();
    addBtn.disabled = true;
    searchInput.placeholder ="";

}

function editProduct(index) {
    currentIndex = index;
    const product = productContainer[index];
    ProductName.value = product.name;
    ProductCount.value = product.count;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDesc.value = product.desc;
    addBtn.textContent = 'Update Product';
    addBtn.disabled='true';
    searchInput.placeholder ="";


}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('productsList', JSON.stringify(productContainer));
    loadProducts();
    searchInput.placeholder ="";

}

function clearInputs() {
    ProductName.value = '';
    ProductCount.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
    nameAlert.classList.add('d-none');
    countAlert.classList.add('d-none');
    priceAlert.classList.add('d-none');
    categoryAlert.classList.add('d-none');
    searchInput.placeholder ="";

}

function deleteAllItems() {
    localStorage.removeItem('productsList');
    productContainer = [];
    loadProducts();
    searchInput.placeholder ="";

}
//validation
function testInputs() {
    const inputs = document.querySelectorAll('input');
    let inputsValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            inputsValid = false;
        }
    });

    addBtn.disabled = !inputsValid; 
}

ProductName.onkeyup = function() {
    validateInput(ProductName, /^[a-zA-Z0-9]{1,}$/, nameAlert);
    testInputs();
};

ProductCount.onkeyup = function() {
    validateInput(ProductCount, /^[0-9]{1,}$/, countAlert);
    testInputs();
};

productPrice.onkeyup = function() {
    validateInput(productPrice, /^[0-9]{1,}$/, priceAlert);
    testInputs();
};

productCategory.onkeyup = function() {
    validateInput(productCategory, /^[a-zA-Z0-9]{1,}$/, categoryAlert);
    testInputs();
};
function validateInput(inputElement, regex, alertElement) {
    if (regex.test(inputElement.value)) {
        inputElement.classList.add("is-valid");
        inputElement.classList.remove("is-invalid");
        alertElement.classList.add('d-none');
    } else {
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
        alertElement.classList.remove('d-none');
    }
}



//sort
document.getElementById('iFilter').addEventListener('click', function() {
    const catMenu = document.querySelector('.cat');
    
    if (catMenu.style.display === 'block') {
      catMenu.style.display = 'none';
    } else {
      catMenu.style.display = 'block';
    }
  });
 
function filter(type)
{
if(type=="name")
{
    productContainer.sort((a, b) => a.name.localeCompare(b.name));
    searchInput.placeholder ="sorted by name";
    displayProducts(productContainer);
}
else if(type=="price")
{
    productContainer.sort((a, b) => a.price - b.price);
    searchInput.placeholder ="sorted by price";
    displayProducts(productContainer);
}
}
  window.addEventListener('click', function(event) {
    const iFilter = document.getElementById('iFilter');
    const catMenu = document.querySelector('.cat');
    
    if (!iFilter.contains(event.target) && !catMenu.contains(event.target)) {
      catMenu.style.display = 'none';
    }
  });
