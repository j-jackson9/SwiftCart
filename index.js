let addToCartBtn = document.querySelectorAll('.add-to-cart');
let itemCount = document.querySelector('.cart-badge');
let cartTotal = parseInt(itemCount.innerHTML) || 0;
let itemQuantity = document.querySelector('.quantity');









addToCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Item(s) added to cart');
         // Get the quantity from the specific input field next to the clicked button
        let itemQuantity = btn.previousElementSibling.querySelector('.quantity');
        let quantity = parseInt(itemQuantity.value) || 1;
        cartTotal += quantity;
        itemCount.innerHTML = cartTotal;
        console.log(itemCount.innerHTML);
    });
});