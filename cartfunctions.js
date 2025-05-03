let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.querySelector(".checkout-btn");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='text-align: center; color: #888;'>Your cart is empty.</p>";
        cartTotal.style.display = "none";
        checkoutBtn.style.display = "none";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        let imagePath = item.image.replace(/^\.\.\//, '');
        const itemHTML = `
            <div class="cart-item">
                <img src="${imagePath}" alt="${item.name}">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>Color: ${item.colorDisplay || item.color.charAt(0).toUpperCase() + item.color.slice(1)}</p>
                    <p>Size: US ${item.size}</p>
                    <p>₱${item.price.toLocaleString()} x ${item.quantity}</p>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
        cartItems.innerHTML += itemHTML;
    });

    cartTotal.innerText = `Total: ₱${total.toLocaleString()}`;
    cartTotal.style.display = "block";
    checkoutBtn.style.display = "block";
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function showPaymentForm() {
    document.getElementById("payment-section").style.display = "block";
}

function validatePayment() {
    const cardName = document.getElementById("card-name").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Hide error message when user starts typing
    document.querySelectorAll(".payment-form input").forEach(input => {
        input.addEventListener("input", () => {
            document.getElementById("error-message").style.display = "none";
        });
    });

    const isValid = validatePaymentFields(cardName, cardNumber, expiryDate, cvv);

    if (isValid) {
        showSuccessMessage();
        setTimeout(() => {
            window.location.href = "homepage.html"; // Redirect after 5 seconds
        }, 5000);
    }
}

function validatePaymentFields(cardName, cardNumber, expiryDate, cvv) {
    const cardNumberPattern = /^\d{16}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    if (cardName.length < 3) {
        showErrorMessage("Name on card must be at least 3 characters.");
        return false;
    }

    if (!cardNumber.match(cardNumberPattern)) {
        showErrorMessage("Card number must be 16 digits.");
        return false;
    }

    if (!expiryDate.match(expiryPattern)) {
        showErrorMessage("Expiry date must be in MM/YY format.");
        return false;
    }

    if (!cvv.match(cvvPattern)) {
        showErrorMessage("CVV must be 3 digits.");
        return false;
    }

    return true;
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
}

function showSuccessMessage() {
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    document.getElementById("payment-section").style.display = "none";

    // Allow user to manually navigate instead of forcing a redirect
    const redirectButton = document.createElement("button");
    redirectButton.innerText = "Go to Homepage";
    redirectButton.className = "checkout-btn";
    redirectButton.onclick = () => {
        window.location.href = "homepage.html";
    };
    successMessage.appendChild(redirectButton);
}

renderCart();
