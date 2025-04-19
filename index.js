let addToCartBtn = document.querySelectorAll('.add-to-cart');
let itemCount = document.querySelector('.cart-badge');

// Initialize cartTotal from localStorage
let cartTotal = parseInt(localStorage.getItem('cartTotal')) || 0;
itemCount.innerHTML = cartTotal; // Update the cart badge on page load

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

        localStorage.setItem('cartTotal', cartTotal);

      
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

    let cartTotal = localStorage.getItem('cartTotal') || 0;
    let totalDisplay = document.querySelector('.cart-badge');
    totalDisplay.innerHTML = cartTotal;


let removeFromCartBtn = document.querySelectorAll('.remove-item');

removeFromCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Correctly get the parent cart item DOM element
        let cartItem = btn.closest('.cart-item');

        // Get the name from the <h3> inside the cart item
        let itemName = cartItem.querySelector('h3').innerHTML;

        // Find the index of the item in the cart array
        let itemIndex = cart.findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            // Remove from cart array
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Remove from DOM
            cartItem.remove();

            // Update cart total
            let cartTotal = parseInt(localStorage.getItem('cartTotal')) || 0;
            cartTotal = Math.max(0, cartTotal - 1);
            localStorage.setItem('cartTotal', cartTotal);

            // Update cart badge
            let totalDisplay = document.querySelector('.cart-badge');
            totalDisplay.innerHTML = cartTotal;

            displayCart(); // Refresh the cart display

            alert('Item removed from cart');
        }
    });
})};
