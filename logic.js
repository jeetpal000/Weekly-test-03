const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 }
];

let cart = [];

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    Products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.name} - ${product.price}</p>
            <div>
                <button onclick="addToCart(${product.id})">+</button>
                <span id="product-quantity-${product.id}">0</span>
                <button onclick="removeFromCart(${product.id})">-</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total-price');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>No Product added to the cart</p>';
        totalElement.textContent = '0';
        return;
    }

    let total = 0;
    let productQuantities = {};

    cart.forEach(product => {
        if (!productQuantities[product.id]) {
            productQuantities[product.id] = 0;
        }
        productQuantities[product.id]++;
        total += product.price;
    });

    Object.keys(productQuantities).forEach(productId => {
        const product = Products.find(p => p.id === parseInt(productId));
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${product.name} - ${product.price} x ${productQuantities[productId]}</p>
        `;
        cartList.appendChild(cartItem);
        document.getElementById(`product-quantity-${productId}`).textContent = productQuantities[productId];
    });

    totalElement.textContent = total;
}

// Initial render
renderProducts();
updateCart();
