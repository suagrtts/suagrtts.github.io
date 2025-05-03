// Authentication state management
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const currentPage = window.location.pathname;

    // Pages that require authentication
    const protectedPages = ['profile.html', 'cart.html', 'favorites.html'];
    // Pages that should redirect to profile if already logged in
    const authPages = ['login.html', 'signup.html', 'forgotpassword.html'];

    const currentPageName = currentPage.split('/').pop();

    if (isLoggedIn && userProfile) {
        // If user is logged in and tries to access auth pages, redirect to profile
        if (authPages.includes(currentPageName)) {
            window.location.replace('profile.html');
            return false;
        }
    } else {
        // If user is not logged in and tries to access protected pages, redirect to login
        if (protectedPages.includes(currentPageName)) {
            window.location.replace('login.html');
            return false;
        }
    }
    return true;
}

// Get user profile data
function getUserProfile() {
    const userProfile = localStorage.getItem('userProfile');
    return userProfile ? JSON.parse(userProfile) : null;
}

// Update profile dropdown with user data
function updateProfileDropdown() {
    const userProfile = getUserProfile();
    if (userProfile) {
        // Update desktop dropdown
        const dropdownName = document.getElementById('dropdownName');
        const dropdownEmail = document.getElementById('dropdownEmail');
        if (dropdownName) dropdownName.textContent = userProfile.fullName;
        if (dropdownEmail) dropdownEmail.textContent = userProfile.email;

        // Update mobile dropdown
        const dropdownNameMobile = document.getElementById('dropdownNameMobile');
        const dropdownEmailMobile = document.getElementById('dropdownEmailMobile');
        if (dropdownNameMobile) dropdownNameMobile.textContent = userProfile.fullName;
        if (dropdownEmailMobile) dropdownEmailMobile.textContent = userProfile.email;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    localStorage.removeItem('shippingAddress');
    window.location.replace('login.html');
}

// Check login state when page loads
document.addEventListener('DOMContentLoaded', checkLoginState);

// Update navbar based on authentication status
function updateNavbar() {
    const navProfile = document.querySelector('.nav-profile');
    if (navProfile) {
        if (checkLoginState()) {
            const userProfile = getUserProfile();
            updateProfileDropdown();
        } else {
            // Show login/signup links instead of profile dropdown
            navProfile.innerHTML = `
                <div class="profile-dropdown-items">
                    <a href="login.html" class="profile-dropdown-item">
                        <i class="fas fa-sign-in-alt"></i>
                        Login
                    </a>
                    <a href="signup.html" class="profile-dropdown-item">
                        <i class="fas fa-user-plus"></i>
                        Sign Up
                    </a>
                </div>
            `;
        }
    }
} 