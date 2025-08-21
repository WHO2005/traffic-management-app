// Kigali Traffic Management System - Authentication JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Set up event listeners for register form if it exists
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    // Get form data
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Show loading state
    const loginButton = document.getElementById('loginButton');
    const originalText = loginButton.innerHTML;
    loginButton.innerHTML = '<span class="loading-spinner"></span> Logging in...';
    loginButton.disabled = true;
    
    try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate the login process
        await simulateLogin(username, password);
        
        // Show success message
        showAuthMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        console.error('Login error:', error);
        
        // Show error message
        showAuthMessage(error.message || 'Login failed. Please try again.', 'error');
        
        // Reset button
        loginButton.innerHTML = originalText;
        loginButton.disabled = false;
    }
}

// Simulate login process
function simulateLogin(username, password) {
    return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
            // Simple validation for demonstration
            if (username && password) {
                // In a real implementation, this would validate credentials against a database
                // For now, we'll accept any non-empty username and password
                resolve({
                    username: username,
                    token: 'sample-jwt-token'
                });
            } else {
                reject(new Error('Please enter both username and password'));
            }
        }, 1500);
    });
}

// Handle register form submission
async function handleRegister(event) {
    event.preventDefault();
    
    // Get form data
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Show loading state
    const registerButton = document.getElementById('registerButton');
    const originalText = registerButton.innerHTML;
    registerButton.innerHTML = '<span class="loading-spinner"></span> Registering...';
    registerButton.disabled = true;
    
    try {
        // Validate form data
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        
        // In a real implementation, this would call the backend API
        // For now, we'll simulate the registration process
        await simulateRegister(username, email, password);
        
        // Show success message
        showAuthMessage('Registration successful! Please check your email to verify your account.', 'success');
        
        // Reset form
        document.getElementById('registerForm').reset();
    } catch (error) {
        console.error('Registration error:', error);
        
        // Show error message
        showAuthMessage(error.message || 'Registration failed. Please try again.', 'error');
    } finally {
        // Reset button
        registerButton.innerHTML = originalText;
        registerButton.disabled = false;
    }
}

// Simulate registration process
function simulateRegister(username, email, password) {
    return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
            // Simple validation for demonstration
            if (username && email && password) {
                // In a real implementation, this would create a new user in the database
                // For now, we'll accept any valid input
                resolve({
                    username: username,
                    email: email
                });
            } else {
                reject(new Error('Please fill in all required fields'));
            }
        }, 1500);
    });
}

// Show authentication message
function showAuthMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `auth-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.right = '20px';
    messageElement.style.padding = '10px 15px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageElement.style.zIndex = '1000';
    messageElement.style.maxWidth = '300px';
    
    // Set colors based on type
    if (type === 'success') {
        messageElement.style.backgroundColor = '#27ae60';
        messageElement.style.color = 'white';
    } else {
        messageElement.style.backgroundColor = '#e74c3c';
        messageElement.style.color = 'white';
    }
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.float = 'right';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '10px';
    closeBtn.addEventListener('click', function() {
        messageElement.remove();
    });
    
    messageElement.appendChild(closeBtn);
    document.body.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Kigali-specific authentication data
const KIGALI_AUTH_DATA = {
    supportedLanguages: ['en', 'rw', 'fr'],
    defaultLanguage: 'rw',
    passwordRequirements: {
        minLength: 6,
        requireUppercase: false,
        requireLowercase: false,
        requireNumbers: false,
        requireSpecialChars: false
    },
    twoFactorAuth: {
        enabled: true,
        methods: ['sms', 'email']
    }
};

// Export functions for use in other modules
window.KigaliAuth = {
    handleLogin,
    handleRegister,
    showAuthMessage,
    KIGALI_AUTH_DATA
};