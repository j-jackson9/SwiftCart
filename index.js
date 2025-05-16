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

    let totalCartPrice = document.querySelector('.cart-price-total');
    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.img}" alt="">
            <div>
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <input type="number" class="quantity" value="${item.quantity}" min="1" max="10">
                <button class="remove-item">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Calculate and update the total price of all items in the cart
    let total = cart.reduce((sum, item) => {
        let price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return sum + price * item.quantity;
    }, 0);

    totalCartPrice.innerHTML = `Total: $${total.toFixed(2)}`;

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

        // Find the item in the cart array
        let existingItem = cart.find(item => item.name === itemName);
        
        if (existingItem) {
            // Get the quantity to remove from the input field
            let quantityToRemove = parseInt(cartItem.querySelector('.quantity').value) || 1;

            // Decrement the quantity of the item
            existingItem.quantity -= quantityToRemove;

            // Update cart total
            let cartTotal = parseInt(localStorage.getItem('cartTotal')) || 0;
            cartTotal = Math.max(0, cartTotal - quantityToRemove);
            localStorage.setItem('cartTotal', cartTotal);

            // Update cart badge
            let totalDisplay = document.querySelector('.cart-badge');
            totalDisplay.innerHTML = cartTotal;

            if (existingItem.quantity <= 0) {
                // Remove the item from the cart array if quantity is 0 or less
                cart = cart.filter(item => item.name !== itemName);

                // Remove from DOM
                cartItem.remove();
            } else {
                // Update the quantity in the DOM
                cartItem.querySelector('.quantity').value = existingItem.quantity;
            }

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            displayCart(); // Refresh the cart display

            alert('Item updated in cart');
        }
    });
});
}

//localStorage.clear(); 