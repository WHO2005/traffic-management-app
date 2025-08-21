// Kigali Traffic Management System - Settings JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the settings page
    initializeSettings();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load saved settings
    loadSettings();
});

// Initialize the settings page
function initializeSettings() {
    console.log('Kigali Traffic Settings System initialized');
}

// Set up event listeners
function setupEventListeners() {
    const saveButton = document.getElementById('save-settings');
    
    if (saveButton) {
        saveButton.addEventListener('click', saveSettings);
    }
    
    // Add event listeners for all settings inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            // Mark settings as changed
            markSettingsChanged();
        });
    });
}

// Load saved settings
function loadSettings() {
    try {
        // In a real implementation, this would load settings from localStorage or backend
        // For now, we'll use default values
        
        console.log('Settings loaded');
        
        // Update UI to reflect loaded settings
        updateSettingsUI();
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings
function saveSettings() {
    try {
        // Get all settings values
        const settings = getSettingsValues();
        
        // In a real implementation, this would save settings to localStorage or backend
        // For now, we'll just log the settings
        console.log('Saving settings:', settings);
        
        // Show success message
        showSettingsMessage('Settings saved successfully!', 'success');
        
        // Update UI
        updateSettingsUI();
        
        // Mark settings as saved
        markSettingsSaved();
    } catch (error) {
        console.error('Error saving settings:', error);
        
        // Show error message
        showSettingsMessage('Error saving settings. Please try again.', 'error');
    }
}

// Get all settings values
function getSettingsValues() {
    return {
        // Notification preferences
        emailNotifications: document.getElementById('email-notifications').checked,
        smsNotifications: document.getElementById('sms-notifications').checked,
        pushNotifications: document.getElementById('push-notifications').checked,
        
        // Display settings
        theme: document.getElementById('theme').value,
        language: document.getElementById('language').value,
        mapStyle: document.getElementById('map-style').value,
        
        // Traffic alert settings
        alertThreshold: document.getElementById('alert-threshold').value,
        alertSound: document.getElementById('alert-sound').checked,
        vibration: document.getElementById('vibration').checked,
        
        // Route preferences
        preferredRoute: document.getElementById('preferred-route').value,
        avoidRoads: document.getElementById('avoid-roads').value,
        maxWalkingDistance: document.getElementById('max-walking-distance').value,
        
        // Account settings
        username: document.getElementById('username').value,
        email: document.getElementById('email').value
    };
}

// Update settings UI
function updateSettingsUI() {
    // Update system information
    updateSystemInfo();
    
    // Update save button state
    updateSaveButton();
}

// Update system information
function updateSystemInfo() {
    // Update active sensors count
    const activeSensorsElement = document.getElementById('active-sensors');
    if (activeSensorsElement) {
        // Simulate active sensors count
        activeSensorsElement.textContent = Math.floor(Math.random() * 10) + 20;
    }
    
    // Update system status
    const systemStatusElement = document.querySelector('.system-status');
    if (systemStatusElement) {
        systemStatusElement.textContent = 'Operational';
    }
}

// Mark settings as changed
function markSettingsChanged() {
    const saveButton = document.getElementById('save-settings');
    if (saveButton) {
        saveButton.classList.add('changed');
        saveButton.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    }
}

// Mark settings as saved
function markSettingsSaved() {
    const saveButton = document.getElementById('save-settings');
    if (saveButton) {
        saveButton.classList.remove('changed');
        saveButton.innerHTML = '<i class="fas fa-check"></i> Settings Saved';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            saveButton.innerHTML = '<i class="fas fa-save"></i> Save Settings';
        }, 3000);
    }
}

// Update save button state
function updateSaveButton() {
    const saveButton = document.getElementById('save-settings');
    if (saveButton) {
        saveButton.disabled = false;
    }
}

// Show settings message
function showSettingsMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.settings-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `settings-message ${type}`;
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

// Kigali-specific settings data
const KIGALI_SETTINGS_DATA = {
    defaultLanguage: 'rw', // Kinyarwanda as default
    defaultTheme: 'light',
    defaultAlertThreshold: 'medium',
    kigaliSpecificRoads: [
        "KN 1 (Kigali-Nyanza Road)",
        "KN 2 (Kigali-Gisenyi Road)",
        "KN 3 (Kigali-Karongi Road)",
        "KN 5 (Kigali-Musanze Road)",
        "KN 7 (Kigali-Ruhengeri Road)",
        "KN 8 (Kigali-Nyamata Road)",
        "Airport Road",
        "KG 1 (Kigali City Center)",
        "KG 2 (Kimironko)",
        "KG 3 (Kicukiro)",
        "KG 4 (Gisozi)",
        "KG 5 (Remera)"
    ],
    localHolidays: [
        "January 1", // New Year's Day
        "February 1", // National Heroes Day
        "April 7", // Genocide Memorial Day
        "May 1", // Labour Day
        "July 1", // Independence Day
        "July 4", // Liberation Day
        "August 15" // Assumption Day
    ]
};

// Export functions for use in other modules
window.KigaliSettings = {
    loadSettings,
    saveSettings,
    getSettingsValues,
    updateSettingsUI,
    KIGALI_SETTINGS_DATA
};