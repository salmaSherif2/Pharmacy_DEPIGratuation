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

    // const searchInput = document.getElementById('searchInput');
    // searchInput.addEventListener('input', filterInventory);
});

var productContaineer = JSON.parse(localStorage.getItem("productsList")) || [];
function displayInventory() {
    var content = ``;
  
    for (var i = 0; i < productContaineer.length; i++) {
      
        content += `

        <tr>

            <td>${i+1}</td>

            <td>${productContaineer[i].name}</td> 

            <td>${productContaineer[i].count}</td>

            <td>${productContaineer[i].price}</td>

            <td>${productContaineer[i].category}</td>

            <td>${productContaineer[i].desc}</td>


        </tr>`;
       

    }
    document.getElementById("inventoryContent").innerHTML = content;
}






window.onload = function () {
    displayInventory();
};

const searchInput=document.getElementById('searchInput');

searchInput.onkeyup=function(){
    var addTable=``;
    for( var i=0 ; i<productContaineer.length ; i++)
        {
            if(productContaineer[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
            {
                addTable+=`<tr>
                                    <td>${i+1}</td>
                                    <td>${productContaineer[i].name}</td>
                                    <td>${productContaineer[i].count}</td>
                                    <td>${productContaineer[i].price}</td>
                                    <td>${productContaineer[i].category}</td>
                                    <td>${productContaineer[i].desc}</td>
                                    

                                   
        </tr>
        `
        
            }
        }
    document.getElementById("inventoryContent").innerHTML=addTable;
}
