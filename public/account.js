document.addEventListener('DOMContentLoaded', function () {
    const accountForm = document.getElementById('accountForm');
    const addressForm = document.getElementById('addressForm');

    // Event listener for changing password
    accountForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassord = document.getElementById('confirmPassord').value;

        // Send a request to update password on the server
        fetch('/updatePassword', { method: 'POST', body: JSON.stringify({ newPassword, confirmPassord }), headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => console.log(data));
    });

    // Event listener for updating address
    addressForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipcode = document.getElementById('zipcode').value;

        // Send a request to update address on the server
        fetch('/updateAddress', { method: 'POST', body: JSON.stringify({ street, city, state, zipcode }), headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => console.log(data));
    });
    
    fetch('/getUserAddress')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Populate the form fields with the retrieved address
            document.getElementById('street').value = data.address.street;
            document.getElementById('city').value = data.address.city;
            document.getElementById('state').value = data.address.state;
            document.getElementById('zipcode').value = data.address.zipcode;
        } else {
            console.log('Error fetching user address:', data.message);
        }
    });
});
