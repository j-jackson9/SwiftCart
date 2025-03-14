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
    });
}
