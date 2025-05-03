// Profile page logic for rendering user info and managing addresses

document.addEventListener('DOMContentLoaded', function() {
    renderProfile();
    setupAddressModal();
});

function renderProfile() {
    const card = document.getElementById('profileCard');
    const action = document.getElementById('profileAction');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

    if (!isLoggedIn) {
        card.innerHTML = `<div class='no-profile-info'><h2>You are not logged in</h2><p><a href='login.html' class='btn btn-primary'>Log In</a></p></div>`;
        action.innerHTML = '';
        return;
    }
    if (!userProfile) {
        card.innerHTML = `<div class="no-profile-info">
            <h2>No Profile Information Found</h2>
            <p>Please <a href='signup.html'>sign up</a> to create your profile.</p>
        </div>`;
        action.innerHTML = '';
        return;
    }
    card.innerHTML = `
        <h2>My Profile</h2>
        <div class="profile-info-row"><span class="profile-label">Full Name:</span> <span>${userProfile.fullName}</span></div>
        <div class="profile-info-row"><span class="profile-label">Email:</span> <span>${userProfile.email}</span></div>
        <div class="profile-info-row"><span class="profile-label">Phone:</span> <span>${userProfile.phone}</span></div>
        <div class="profile-info-row"><span class="profile-label">Birthday:</span> <span>${userProfile.birthday}</span></div>
        <div class="profile-info-row"><span class="profile-label">Gender:</span> <span>${userProfile.gender}</span></div>
        <div class="profile-info-row"><span class="profile-label">Shipping Address:</span> <span>${shippingAddress ? formatAddress(shippingAddress) : 'No address added.'}</span></div>
        <button id="addAddressBtn" class="btn btn-primary">Add / Edit Address</button>
    `;
    action.innerHTML = `<button id='logoutBtn' class='btn btn-primary logout-btn'>Logout</button>`;
    document.getElementById('logoutBtn').onclick = function() {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'login.html';
    };
    document.getElementById('addAddressBtn').onclick = function() {
        openAddressModal();
    };
}

function formatAddress(addr) {
    return `${addr.addressName}: ${addr.fullAddress}, ${addr.city}, ${addr.province}, ${addr.postalCode}`;
}

function setupAddressModal() {
    const modal = document.getElementById('addressModal');
    const form = document.getElementById('addressForm');
    const cancelBtn = document.getElementById('cancelAddressBtn');
    if (!modal || !form || !cancelBtn) return;
    cancelBtn.onclick = function() {
        modal.style.display = 'none';
    };
    form.onsubmit = function(e) {
        e.preventDefault();
        const address = {
            addressName: document.getElementById('addressName').value,
            fullAddress: document.getElementById('fullAddress').value,
            city: document.getElementById('city').value,
            province: document.getElementById('province').value,
            postalCode: document.getElementById('postalCode').value,
            isDefault: document.getElementById('isDefault').checked
        };
        localStorage.setItem('shippingAddress', JSON.stringify(address));
        modal.style.display = 'none';
        renderProfile();
    };
}

function openAddressModal() {
    const modal = document.getElementById('addressModal');
    if (modal) {
        // Optionally prefill with existing address
        const addr = JSON.parse(localStorage.getItem('shippingAddress'));
        if (addr) {
            document.getElementById('addressName').value = addr.addressName || '';
            document.getElementById('fullAddress').value = addr.fullAddress || '';
            document.getElementById('city').value = addr.city || '';
            document.getElementById('province').value = addr.province || '';
            document.getElementById('postalCode').value = addr.postalCode || '';
            document.getElementById('isDefault').checked = !!addr.isDefault;
        } else {
            document.getElementById('addressForm').reset();
        }
        modal.style.display = 'block';
    }
}

// Optional: close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addressModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}; 