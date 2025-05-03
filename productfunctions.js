// Product data from homepagefunctions.js
let product = null;

// DOM Elements
const productImage = document.getElementById('productImage');
const productName = document.getElementById('productName');
const currentPrice = document.getElementById('currentPrice');
const originalPrice = document.getElementById('originalPrice');
const discount = document.getElementById('discount');
const productBrand = document.getElementById('productBrand');
const productStyle = document.getElementById('productStyle');
const productDescription = document.getElementById('productDescription');
const sizeOptions = document.getElementById('sizeOptions');
const addToCartBtn = document.getElementById('addToCart');
const addToWishlistBtn = document.getElementById('addToWishlist');

// Size options
const sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

// Initialize the page
function initializeProductPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find the product in the products array
    product = products.find(p => p.id === productId);

    if (!product) {
        showError('Product not found');
        return;
    }

    // Update page title
    document.title = `${product.name} - Nike Store`;

    // Update product details
    productImage.src = product.image;
    productImage.alt = product.name;
    productName.textContent = product.name;
    currentPrice.textContent = formatPrice(product.price);
    originalPrice.textContent = formatPrice(product.originalPrice);
    discount.textContent = `${product.discount}% OFF`;
    productBrand.textContent = product.brand;
    productStyle.textContent = product.style;
    productDescription.textContent = product.description;

    // Create size options
    createSizeOptions();

    // Initialize event listeners
    initializeEventListeners();
}

// Create size options
function createSizeOptions() {
    sizeOptions.innerHTML = '';
    sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'size-option';
        sizeBtn.textContent = size;
        sizeBtn.addEventListener('click', () => selectSize(sizeBtn));
        sizeOptions.appendChild(sizeBtn);
    });
}

// Handle size selection
function selectSize(selectedBtn) {
    const sizeBtns = document.querySelectorAll('.size-option');
    sizeBtns.forEach(btn => btn.classList.remove('selected'));
    selectedBtn.classList.add('selected');
    addToCartBtn.disabled = false;
}

// Initialize event listeners
function initializeEventListeners() {
    // Add to cart
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-option.selected');
        if (!selectedSize) {
            showError('Please select a size');
            return;
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize.textContent,
            image: product.image
        };

        addToCart(cartItem);
        showSuccess('Added to cart!');
    });

    // Add to wishlist
    addToWishlistBtn.addEventListener('click', () => {
        toggleWishlist(product.id);
        const isInWishlist = isInWishlist(product.id);
        addToWishlistBtn.innerHTML = isInWishlist ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
    });

    // Check if product is in wishlist
    if (isInWishlist(product.id)) {
        addToWishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
}

// Cart functions
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Wishlist functions
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.includes(productId);
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(price);
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showSuccess(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProductPage); 