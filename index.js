let addToCartBtn = document.querySelectorAll('.add-to-cart');
let itemCount = document.querySelector('.cart-badge');
let cartTotal = parseInt(itemCount.innerHTML) || 0;

addToCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Item(s) added to cart');
         // Get the quantity from the specific input field next to the clicked button
        let itemQuantity = btn.previousElementSibling.querySelector('.quantity');
        // Convert the quantity from a string to a number
        let quantity = itemQuantity ? parseInt(itemQuantity.value) || 1 : 1; // Add null check
        // Add the quantity to the cart
        cartTotal += quantity;
        // Update the cart total
        itemCount.innerHTML = cartTotal;
        // Reset the quantity input field
        console.log(itemCount.innerHTML);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let item = 
            {
                img: btn.closest('.item').querySelector('img').src,
                name: btn.closest('.item').querySelector('.name').innerHTML,
                price: btn.closest('.item').querySelector('.price').innerHTML,
                quantity: quantity,
            };
        
        // Check if the item already exists in the cart
        let existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            // Update the quantity of the existing item
            existingItem.quantity += item.quantity;
        } else {
            // Add the new item to the cart
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(cart);
    });
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.querySelector('.cart-items');

    cartItems.innerHTML = '';

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="">
            <div>
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-item">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}
