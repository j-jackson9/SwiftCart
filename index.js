let addToCart = document.getElementsByClassName('add-to-cart');
let cart = document.getElementsByClassName('cart-badge')[0];
let totalCartItems = 0;

cart.innerHTML = totalCartItems;

for (let button of addToCart) {
    button.addEventListener('click', () => {
        let quantityInput = button.previousElementSibling.querySelector('.quantity'); 
        let quantity = parseInt(quantityInput.value) || 1;
        totalCartItems += quantity;
        cart.innerHTML = totalCartItems;
        alert(`Added ${quantity} item(s) to your cart!`);

            let img = document.querySelector('.item img');
            let name = document.querySelector('.name');
            let price = document.querySelector('.price');
        
            let item = {
                image: img.src,
                name: name.innerText,
                price: price.innerText
            };
        
            localStorage.setItem('item', JSON.stringify(item));
            let storedItem = JSON.parse(localStorage.getItem('item'));
        } );
};

let quantityInputs = document.getElementsByClassName('quantity');
for (let input of quantityInputs) {
    input.addEventListener('input', () => {
        // Get the value from the input field and ensure it's within the allowed range (1-4)
        let value = parseInt(input.value);
        if (value < 1) {
            input.value = 1; // Reset to 1 if less than 1
        } else if (value > 4) {
            input.value = 4; // Limit to max 4
        }
    });
}


function displayCart() {
    let storedItem = JSON.parse(localStorage.getItem('item'));
    let cartItem = document.createElement('div');
    cartItem.innerHTML = `
        <img src="${storedItem.image}" alt="item">
        <p>${storedItem.name}</p>
        <p>${storedItem.price}</p>
    `;
    document.getElementsByClassName('cart-items')[0].appendChild(cartItem);
}