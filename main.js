// Kigali Traffic Management System - Frontend JavaScript

// API base URL (in a real implementation, this would point to the backend)
const API_BASE = 'http://localhost:5000/api';

// WebSocket connection for real-time updates
let socket = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    
    // Set up navigation
    setupNavigation();
    
    // Load initial data
    loadDashboardData();
    
    // Set up WebSocket connection for real-time updates
    setupWebSocket();
    
    // Set up form submissions
    setupForms();
});

// Initialize the application
function initializeApp() {
    console.log('Kigali Traffic Management System initialized');
    
    // Set up periodic data updates
    setInterval(loadDashboardData, 30000); // Update every 30 seconds
}

// Set up navigation
function setupNavigation() {
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // In a real implementation, this would fetch data from the backend
        // For now, we'll use simulated data
        
        // Update system status
        document.querySelector('.violations-count').textContent = Math.floor(Math.random() * 10);
        document.querySelector('.system-status').textContent = 'Operational';
        
        // Render traffic flow chart
        renderTrafficFlowChart();
        
        // Update route recommendations
        updateRouteRecommendations();
        
        console.log('Dashboard data updated');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Render traffic flow chart
function renderTrafficFlowChart() {
    const chartContainer = document.querySelector('.traffic-flow-chart');
    
    // Clear previous chart if exists
    chartContainer.innerHTML = '<canvas id="trafficFlowChart"></canvas>';
    
    // Generate sample data for the chart
    const hours = [];
    const vehicleCounts = [];
    const averageSpeeds = [];
    
    for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`);
        vehicleCounts.push(Math.floor(Math.random() * 100) + 50);
        averageSpeeds.push(Math.floor(Math.random() * 30) + 20);
    }
    
    // Create chart
    const ctx = document.getElementById('trafficFlowChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [
                {
                    label: 'Vehicle Count',
                    data: vehicleCounts,
                    borderColor: '#006600',
                    backgroundColor: 'rgba(0, 102, 0, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Average Speed (km/h)',
                    data: averageSpeeds,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Vehicle Count'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Average Speed (km/h)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

// Update route recommendations
function updateRouteRecommendations() {
    // Generate sample route recommendations for Kigali
    const recommendations = generateKigaliRecommendations();
    displayRouteRecommendations(recommendations);
}

// Generate sample route recommendations for Kigali
function generateKigaliRecommendations() {
    return [
        {
            id: 1,
            name: "Airport to City Center",
            time: "25 min",
            distance: "12.3 km",
            traffic: "low",
            details: "Via KN 3 and KN 5 - Minimal traffic expected"
        },
        {
            id: 2,
            name: "Nyabugogo to Kimironko",
            time: "18 min",
            distance: "8.7 km",
            traffic: "medium",
            details: "Via KN 1 and KN 7 - Moderate traffic during rush hour"
        },
        {
            id: 3,
            name: "Gisozi to Kicukiro",
            time: "22 min",
            distance: "15.2 km",
            traffic: "low",
            details: "Via KN 2 and KN 8 - Scenic route with light traffic"
        }
    ];
}

// Display route recommendations
function displayRouteRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    
    if (!recommendations || recommendations.length === 0) {
        recommendationsContainer.innerHTML = '<div class="recommendation-placeholder">No recommendations available at this time.</div>';
        return;
    }
    
    let html = '<div class="recommendation-grid">';
    recommendations.forEach(route => {
        html += `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <h4 class="recommendation-title">${route.name}</h4>
                    <div class="recommendation-time">${route.time}</div>
                </div>
                <div class="recommendation-details">
                    <span class="recommendation-distance">${route.distance}</span>
                    <span>
                        <span class="traffic-indicator-small traffic-${route.traffic}"></span>
                        ${route.traffic.charAt(0).toUpperCase() + route.traffic.slice(1)} Traffic
                    </span>
                </div>
                <div class="recommendation-description">
                    ${route.details}
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    recommendationsContainer.innerHTML = html;
}

// Set up WebSocket connection for real-time updates
function setupWebSocket() {
    // In a real implementation, this would connect to a WebSocket server
    // For now, we'll simulate real-time updates
    
    console.log('Setting up WebSocket connection...');
    
    // Simulate WebSocket connection
    setTimeout(() => {
        console.log('Connected to real-time traffic updates');
        
        // Simulate periodic traffic updates
        setInterval(() => {
            console.log('Received real-time traffic update');
            // Update traffic visualization
            updateTrafficVisualization();
        }, 30000); // Update every 30 seconds
    }, 1000);
}

// Update traffic visualization
function updateTrafficVisualization() {
    // In a real implementation, this would update the traffic map
    // For now, we'll just log the update
    console.log('Traffic visualization updated');
    
    // Update the traffic flow chart
    renderTrafficFlowChart();
}

// Set up form submissions
function setupForms() {
    // Add event listeners for any forms
    console.log('Setting up form submissions');
}

// Kigali-specific location data
const KIGALI_LOCATIONS = [
    "Kigali City Center",
    "Kigali International Airport",
    "Nyabugogo Bus Station",
    "Kimironko Market",
    "Kicukiro Centre",
    "Gisozi",
    "Kabuga",
    "Remera",
    "Nyamirambo",
    "Kimisagara",
    "Parliament Building",
    "Kigali Genocide Memorial",
    "Rwandan National Museum",
    "Presidential Palace",
    "Nyamata",
    "Ruhengeri",
    "Butare",
    "Muhanga",
    "Rwamagana",
    "Nyanza"
];

// Set up autocomplete for location inputs
function setupAutocomplete(inputElement) {
    // Create datalist element
    const datalistId = inputElement.id + '-list';
    let datalist = document.getElementById(datalistId);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = datalistId;
        document.body.appendChild(datalist);
    }
    
    // Add Kigali locations to datalist
    datalist.innerHTML = '';
    KIGALI_LOCATIONS.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        datalist.appendChild(option);
    });
    
    // Set input attributes
    inputElement.setAttribute('list', datalistId);
    
    // Add event listener for when a location is selected
    inputElement.addEventListener('change', function() {
        const selectedValue = this.value;
        if (KIGALI_LOCATIONS.includes(selectedValue)) {
            console.log('Selected Kigali location:', selectedValue);
        }
    });
}

// Geolocation functionality for driver location tracking
function getCurrentLocation() {
    // Show loading state
    const locationBtn = document.getElementById('current-location-btn');
    if (locationBtn) {
        const originalText = locationBtn.innerHTML;
        locationBtn.innerHTML = '<span class="loading-spinner"></span> Detecting location...';
        locationBtn.disabled = true;
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(`Current location: ${lat}, ${lng}`);
                
                // In a real implementation, this would reverse geocode the coordinates
                // For now, we'll use a sample Kigali location
                const sampleLocation = "Kigali City Center";
                
                // Update origin input if it exists
                const originInput = document.getElementById('origin');
                if (originInput) {
                    originInput.value = sampleLocation;
                }
                
                // Show success message
                showLocationMessage('Location detected successfully!', 'success');
                
                // Reset button
                if (locationBtn) {
                    locationBtn.innerHTML = originalText;
                    locationBtn.disabled = false;
                }
            },
            error => {
                console.error('Error getting location:', error);
                
                // Show error message
                showLocationMessage('Unable to get current location. Please enter manually.', 'error');
                
                // Reset button
                if (locationBtn) {
                    locationBtn.innerHTML = originalText;
                    locationBtn.disabled = false;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        // Geolocation not supported
        showLocationMessage('Geolocation is not supported by this browser.', 'error');
        
        // Reset button
        if (locationBtn) {
            locationBtn.innerHTML = originalText;
            locationBtn.disabled = false;
        }
    }
}

// Show location detection messages
function showLocationMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.location-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `location-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.right = '20px';
    messageElement.style.padding = '10px 15px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageElement.style.zIndex = '1000';
    messageElement.style.maxWidth = '300px';
    
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

// Export functions for use in other modules
window.KigaliTrafficApp = {
    getCurrentLocation,
    setupAutocomplete,
    KIGALI_LOCATIONS
};