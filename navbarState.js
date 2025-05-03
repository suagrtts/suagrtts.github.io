// Update navigation based on login state
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const profileLink = document.querySelector('.nav-links a[href="profile.html"], .nav-links a[href="login.html"]');
    
    if (profileLink) {
        if (isLoggedIn && userProfile) {
            profileLink.href = 'profile.html';
            profileLink.innerHTML = 'Profile <i class="fas fa-user"></i>';
        } else {
            profileLink.href = 'login.html';
            profileLink.innerHTML = 'Sign In / Sign Up <i class="fas fa-sign-in-alt"></i>';
        }
    }

    // Update cart and favorites count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    const cartCount = document.querySelector('.cart-count');
    const favoritesCount = document.querySelector('.favorites-count');
    
    if (cartCount) {
        cartCount.textContent = isLoggedIn ? cart.reduce((sum, item) => sum + item.quantity, 0) : '0';
    }
    if (favoritesCount) {
        favoritesCount.textContent = isLoggedIn ? favorites.length : '0';
    }
}

// Call updateNavigation when the page loads and when storage changes
document.addEventListener('DOMContentLoaded', updateNavigation);
window.addEventListener('storage', updateNavigation); 