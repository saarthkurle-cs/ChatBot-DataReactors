// loadNavBar.js

// Function to load the navigation bar dynamically
function loadNavBar() {
    const navbarContainer = document.getElementById('navbar-container');

    // Define the HTML content for the navigation bar
    const navbarHTML = `
        <nav class="navbar">
            <ul class="list-container">
                <li class="list-item"><a href="./index.html" class="list active">Home</a></li>
                <li class="list-item"><a href="./Login.html" class="list">Login</a></li>
                <li class="list-item"><a href="./About.html" class="list">About</a></li>
                <li class="list-item"><a href="./FAQ.html" class="list">FAQ</a></li>
            </ul>
            <div class="interaction">
                <div class="cart-user">
                    <a href="./Checkout.html" class="list"><img src="cart.png" class="icons" alt=""></a>
                    <a href="./Account.html" class="list"><img src="user.png" class="icons" alt=""></a>
                    <span id="userGreeting"></span>
                </div>
            </div>
        </nav>
    `;

    // Inject the HTML content into the container
    navbarContainer.innerHTML = navbarHTML;

    // Load the associated CSS for the navbar
    const navbarStyles = document.createElement('link');
    navbarStyles.rel = 'stylesheet';
    navbarStyles.href = 'navbar.css';
    document.head.appendChild(navbarStyles);

    // Load the associated scripts for the navbar
    const navbarScripts = document.createElement('script');
    navbarScripts.src = 'navbar.js';
    document.head.appendChild(navbarScripts);

    // Update the navbar with the current user's information
    updateNavbar();

    // // Load the associated scripts for the navbar
    // const navbarScripts = document.createElement('script');
    // navbarScripts.src = 'navbar.js'; // Add the script file if you have one
    // document.head.appendChild(navbarScripts);
}
