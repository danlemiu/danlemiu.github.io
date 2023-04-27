
window.addEventListener('load', function (evt) {
    getUser();
    loadProductList();  
    loadShoppingCart();

    this.document.getElementById('btnLogout').addEventListener('click', logout);
    this.document.getElementById('btnPlaceOrder').addEventListener('click', placeOrder);
});

function getUser() {
    const userToken = sessionStorage.getItem('userToken');
    // if no accessToken, redirect to login form
    if (userToken === undefined || userToken === null || userToken === '')
    {   
        window.location.href = getWorkingDirectory() + '/login.html';
    }
    else
    {
        // login to home page
        const currentUser = JSON.parse(userToken);
        document.getElementById('lblWelcome').innerHTML = 'Welcome, ' + currentUser.username;
        return currentUser;
    }
}

async function loadProductList() {
    const response = await callAPI('http://localhost:3000/products', 'GET');
    const jsonData = await response.json();
    
    productList = jsonData;

    for (let product of jsonData) {
        addNewProductRowToTable(product.name, product.price, product.image, product.stock);
    }
}

async function loadShoppingCart() {
    const shoppingCart = await getShoppingCart();

    let totalShoppingCart = 0;
    for (let product of shoppingCart) {
        let total = product.productPrice * product.productQuantity;
        totalShoppingCart += total;
        addNewShoppingCartRowToTable(
            product.id,
            product.productName,
            product.productPrice,
            formatNumber(total),
            product.productQuantity,
            false
        );
    }
    if (shoppingCart === undefined || shoppingCart == null || shoppingCart.length == 0) {        
        document.getElementById('lblNoItemShoppingCart').removeAttribute('hidden');
        document.getElementById('tblShoppingCart').setAttribute('hidden', true);
        document.getElementById('divPlaceOrder').setAttribute('hidden', true);
    } else {
        document.getElementById('lblNoItemShoppingCart').setAttribute('hidden', true);
        document.getElementById('tblShoppingCart').removeAttribute('hidden');
        document.getElementById('divPlaceOrder').removeAttribute('hidden');
    }
    if (shoppingCart.length > 0) {
        addNewShoppingCartRowToTable(0, 'Total: ' + formatNumber(totalShoppingCart), '', '', '', true);
    }
}


async function getShoppingCart() {
  const url = 'http://localhost:3000/shoppingcarts/users/' + getUser().username + '/carts';
  const response = await callAPI(url, 'GET');
  return await response.json();
}


async function addProductToShoppingCart(productName, productPrice) {  

    const shoppingCart = await getShoppingCart();

    const currentQuantity = shoppingCart.find((p) => p.productName == productName);
    let currentStock = getCurrentStock(productName);
    if (currentStock == 0
        || (currentQuantity !== undefined && parseInt(currentQuantity.productQuantity) + 1 > currentStock))
    {
        alert('The quantity cannot exceed the stock limit: ' + currentStock);
        return;
    }

    const response = await callAPI(
        'http://localhost:3000/shoppingcarts',
        'POST',
        JSON.stringify({
            username: getUser().username,
            productName: productName,
            productPrice: productPrice,
            productQuantity: 1,
        })
    );

    let jsonData = await response.json();
    if (jsonData)
    {
        window.location.reload();
    }
}

async function updateProductShoppingCart(shoppingCartRowId, productName, productPrice, total, productQuantity) {
    const response = await callAPI(
    'http://localhost:3000/shoppingcarts/' + shoppingCartRowId,
    'PUT',
    JSON.stringify({
        username: getUser().username,
        productName: productName,
        productPrice: productPrice,
        total: total,
        productQuantity: productQuantity,
    })
    );

    let jsonData = await response.json();
    if (jsonData)
    {
        console.log('Successfully updated shopping cart ' + jsonData.id);
    }
}

async function deleteProductShoppingCart(shoppingCartRowId) {
    const response = await callAPI('http://localhost:3000/shoppingcarts/' + shoppingCartRowId, 'DELETE');

    let jsonData = await response.json();
    if (jsonData) {
        window.location.reload();
    }
}

async function placeOrder() {
  const response = await callAPI(
    'http://localhost:3000/shoppingcarts/users/' + getUser().username + '/place-order',
    'POST'
  );
  if (response.ok) {
    let jsonData = await response.json();
    if (jsonData && jsonData !== '' && jsonData != -1) {
      alert(jsonData);
    }
    
    window.location.reload();
  }
  else
  {
      console.log('Error in placeOrder!');
  }
}



function addNewProductRowToTable(productName, productPrice, productImage, stock) {
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(productName));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(productPrice));
    row.appendChild(cell);

    cell = document.createElement('td');
    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', productImage);
    imageElement.setAttribute('class', 'product-image');
    cell.appendChild(imageElement);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(stock));
    row.appendChild(cell);

    cell = document.createElement('td');
    let btnShoppingCart = document.createElement('button');
    let shoppingCartImage = document.createElement('img');

    btnShoppingCart.appendChild(shoppingCartImage);
    shoppingCartImage.setAttribute('src', './images/cart.png');
    shoppingCartImage.setAttribute('class', 'product-image');
    btnShoppingCart.setAttribute('class', 'btn btn-outline-warning btnAdd');
    btnShoppingCart.setAttribute(
        'onclick',
        'addProductToShoppingCart(' + "'" + productName + "'" + ',' + "'" + productPrice + "'" + ')'
    );

    cell.appendChild(btnShoppingCart);
    row.appendChild(cell);
    document.getElementById('tbodyProductList').appendChild(row);
}

function addNewShoppingCartRowToTable(rowId, name, price, total, quantity, isAddTotalLine) {

    const row = document.createElement('tr');
    row.setAttribute('id', 'item-' + rowId);

    let cell = document.createElement('td');
    cell.setAttribute('id', 'product-name-' + rowId);
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    if (isAddTotalLine == true) {
        cell.setAttribute('colspan', 4);
        cell.setAttribute('id', 'totalCart');
    }
    else {
        cell = document.createElement('td');
        cell.setAttribute('id', 'product-price-' + rowId);
        cell.appendChild(document.createTextNode(price));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.setAttribute('id', 'product-total-' + rowId);
        cell.appendChild(document.createTextNode(total));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.setAttribute('id', 'quantity-group-' + rowId);
        cell.setAttribute('class', 'quantity-group');

    
        let inputGroup = document.createElement('span');
        inputGroup.setAttribute('class', 'input-group');

        let btnMinus = document.createElement('button');
        btnMinus.setAttribute('class', 'btn btn-outline-danger btn-number');
        btnMinus.setAttribute('id', 'minus-quantity-' + rowId);
        btnMinus.setAttribute('type', 'button');
        btnMinus.addEventListener('click', decreaseQuantity);
        btnMinus.appendChild(document.createTextNode('-'));

        let btnPlus = document.createElement('button');
        btnPlus.setAttribute('class', 'btn btn-outline-success btn-number');
        btnPlus.setAttribute('type', 'button');
        btnPlus.setAttribute('id', 'plus-quantity-' + rowId);
        btnPlus.addEventListener('click', increaseQuantity);
        btnPlus.appendChild(document.createTextNode('+'));

        let inputQuantity = document.createElement('input');
        inputQuantity.setAttribute('type', 'text');
        inputQuantity.setAttribute('class', 'form-control input-number');

        cell.appendChild(inputGroup);
        inputGroup.appendChild(btnMinus);
        inputGroup.appendChild(inputQuantity);
        inputQuantity.value = quantity;
        inputGroup.appendChild(btnPlus);

        row.appendChild(cell);
    }

    document.getElementById('tbodyShoppingCart').appendChild(row);
    document.getElementById('lblNoItemShoppingCart').setAttribute('hidden', true);
    document.getElementById('tblShoppingCart').removeAttribute('hidden');
}


function getCurrentStock(productName) {
    return productList.find((p) => p.name == productName).stock;
}


function increaseQuantity(e) {

    let shoppingCartRowId = e.target.getAttribute('id').split('-')[2];
    let inputQuantity = e.target.offsetParent.childNodes[1];
    let productName = document.getElementById('product-name-' + shoppingCartRowId).innerHTML;

    console.log('idx:' + shoppingCartRowId + ' productName:' + productName + ' inputQuantity:' + inputQuantity.value);

    let currentStock = getCurrentStock(productName);

    let quantity = parseInt(inputQuantity.value) + 1;

    if (quantity <= currentStock) {

        let productName = document.getElementById('product-name-' + shoppingCartRowId).innerText;
        let productPrice = document.getElementById('product-price-' + shoppingCartRowId).innerText;
        inputQuantity.value = quantity;
        let total = productPrice * inputQuantity.value;

        updateProductShoppingCart(shoppingCartRowId, productName, productPrice, total, inputQuantity.value);
        window.location.reload();
    }
    else {
        alert('The quantity cannot exceed the stock limit: ' + currentStock);
    }
}

function decreaseQuantity(e) {

    let shoppingCartRowId = e.target.getAttribute('id').split('-')[2];
    let inputQuantity = e.target.offsetParent.childNodes[1];

    if (inputQuantity.value - 1 > 0) {
        let productName = document.getElementById('product-name-' + shoppingCartRowId).innerText;
        let productPrice = document.getElementById('product-price-' + shoppingCartRowId).innerText;

        inputQuantity.value = inputQuantity.value - 1;
        let total = productPrice * inputQuantity.value;

        updateProductShoppingCart(shoppingCartRowId, productName, productPrice, total, inputQuantity.value);
        window.location.reload();
    }
    else {
        let deletedRow = document.getElementById('item-' + shoppingCartRowId);
        deletedRow.remove();
        deleteProductShoppingCart(shoppingCartRowId);
    }
}


function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2 });
}


function getWorkingDirectory() {
    var filePath = window.location.pathname;
    var directory = filePath.substring(0, filePath.lastIndexOf('/'));
    return directory;
}


function logout() {
    sessionStorage.setItem('userToken', '');
    window.location.href = getWorkingDirectory() + '/login.html';
}

async function callAPI(url, method, body) {
    let setting = {
        method: method,
        body: body,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Token': JSON.stringify(getUser()),
        }
    };

    const response = await fetch(url, setting);

    if (response.ok) {
        return response;
    }
    else {
        window.location.href = getWorkingDirectory() + '/login.html';
    }
}


var productList = [];