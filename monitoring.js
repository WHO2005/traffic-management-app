// Kigali Traffic Management System - Monitoring JavaScript

// WebSocket connection for real-time updates
let socket = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the monitoring page
    initializeMonitoring();
    
    // Set up WebSocket connection for real-time updates
    setupWebSocket();
    
    // Set up periodic updates
    setInterval(updateMonitoringData, 30000); // Update every 30 seconds
});

// Initialize the monitoring page
function initializeMonitoring() {
    console.log('Kigali Traffic Monitoring System initialized');
    
    // Update monitoring data
    updateMonitoringData();
}

// Update monitoring data
function updateMonitoringData() {
    // Update traffic map
    updateTrafficMap();
    
    // Update traffic lights status
    updateTrafficLightsStatus();
    
    // Update incident reports
    updateIncidentReports();
    
    console.log('Monitoring data updated');
}

// Update traffic map visualization
function updateTrafficMap() {
    // In a real implementation, this would update the traffic map with real-time data
    console.log('Traffic map updated');
    
    // For demonstration, we'll simulate traffic updates
    const trafficElements = document.querySelectorAll('.road-horizontal, .road-vertical');
    trafficElements.forEach(element => {
        // Randomly change traffic levels
        const trafficLevels = ['traffic-low', 'traffic-medium', 'traffic-high'];
        const randomLevel = trafficLevels[Math.floor(Math.random() * trafficLevels.length)];
        
        // Remove existing traffic classes
        element.classList.remove('traffic-low', 'traffic-medium', 'traffic-high');
        
        // Add new traffic class
        element.classList.add(randomLevel);
        
        // Add tooltip with traffic info
        const trafficLabels = {
            'traffic-low': 'Low Traffic',
            'traffic-medium': 'Medium Traffic',
            'traffic-high': 'High Traffic'
        };
        element.title = trafficLabels[randomLevel];
    });
}

// Update traffic lights status
function updateTrafficLightsStatus() {
    // In a real implementation, this would fetch real-time traffic light status
    console.log('Traffic lights status updated');
    
    // For demonstration, we'll simulate status updates
    const statusElements = document.querySelectorAll('.light-status');
    const statuses = ['traffic-green', 'traffic-yellow', 'traffic-red'];
    const statusLabels = {
        'traffic-green': 'Green',
        'traffic-yellow': 'Yellow',
        'traffic-red': 'Red'
    };
    
    statusElements.forEach(element => {
        // Randomly change status
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Remove existing status classes
        element.classList.remove('traffic-green', 'traffic-yellow', 'traffic-red');
        
        // Add new status class
        element.classList.add(randomStatus);
        
        // Update text
        element.textContent = statusLabels[randomStatus];
    });
}

// Update incident reports
function updateIncidentReports() {
    // In a real implementation, this would fetch real-time incident reports
    console.log('Incident reports updated');
    
    // For demonstration, we'll simulate incident updates
    const incidentItems = document.querySelectorAll('.incident-item');
    incidentItems.forEach(item => {
        // Randomly change incident types
        const incidentTypes = ['Accident', 'Road Closure', 'Heavy Traffic', 'Construction'];
        const randomType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
        
        const typeElement = item.querySelector('.incident-type');
        if (typeElement) {
            typeElement.textContent = randomType;
        }
    });
}

// Set up WebSocket connection for real-time updates
function setupWebSocket() {
    // In a real implementation, this would connect to a WebSocket server
    // For now, we'll simulate real-time updates
    
    console.log('Setting up WebSocket connection for monitoring...');
    
    // Simulate WebSocket connection
    setTimeout(() => {
        console.log('Connected to real-time monitoring updates');
        
        // Simulate periodic monitoring updates
        setInterval(() => {
            console.log('Received real-time monitoring update');
            // Update monitoring visualization
            updateMonitoringData();
        }, 30000); // Update every 30 seconds
    }, 1000);
}

// Kigali-specific monitoring data
const KIGALI_ROADS = [
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
];

// Export functions for use in other modules
window.KigaliMonitoring = {
    updateTrafficMap,
    updateTrafficLightsStatus,
    updateIncidentReports,
    KIGALI_ROADS
};