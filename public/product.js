// product.js

// Function to handle the "Buy Now" button click
function buyNow() {
    // Get the product name and id from the data attributes
    var productName = document.querySelector('.product-box').getAttribute('data-product-name');
    var productId = document.querySelector('.product-box').getAttribute('data-product-id');

    // Make a POST request to the server to add the item to the cart
    fetch('/addtoCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: productId }),
    })
    .then(response => {
        if (response.ok) {
            alert('Item added to cart successfully!');
        } else {
            alert('Error adding item to cart');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
