// cart.js

// Function to fetch cart items from the server
function fetchCartItems() {
    // Make a GET request to the server to fetch cart items
    fetch('/getCartItems')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Call the function to update the UI with cart items
                updateCheckoutUI(data.cartItems);
            } else {
                console.error('Error fetching cart items:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}

// Function to update the checkout UI with cart items
function updateCheckoutUI(cartItems) {
    const checkoutContainer = document.getElementById('checkout-container');

    // Clear the existing content
    checkoutContainer.innerHTML = '';

    // Iterate through each cart item and append it to the checkout container
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        // Create elements for displaying cart item details
        const productName = document.createElement('p');
        productName.textContent = item.name;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${item.price.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItem(item.id));

        // Append elements to the cart item div
        cartItemDiv.appendChild(productName);
        cartItemDiv.appendChild(productPrice);
        cartItemDiv.appendChild(removeButton);

        // Append the cart item div to the checkout container
        checkoutContainer.appendChild(cartItemDiv);
    });

    // Calculate and display the total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    checkoutContainer.appendChild(totalElement);
}

// Function to remove an item from the cart
function removeItem(itemId) {
    // Make a POST request to the server to remove the item from the cart
    fetch('/removeFromCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
    })
    .then(response => {
        if (response.ok) {
            // Item removed successfully, fetch and update the cart items
            fetchCartItems();
        } else {
            console.error('Error removing item from cart');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fetch cart items when the page loads
fetchCartItems();


