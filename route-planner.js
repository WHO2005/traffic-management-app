// Kigali Traffic Management System - Route Planner JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const findRouteBtn = document.getElementById('find-route');
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const currentLocationBtn = document.getElementById('current-location-btn');
    
    // Set up event listeners
    if (findRouteBtn) {
        findRouteBtn.addEventListener('click', findBestRoute);
    }
    
    if (currentLocationBtn) {
        currentLocationBtn.addEventListener('click', function() {
            if (window.KigaliTrafficApp && typeof window.KigaliTrafficApp.getCurrentLocation === 'function') {
                window.KigaliTrafficApp.getCurrentLocation();
            } else {
                getCurrentLocation();
            }
        });
    }
    
    // Set up autocomplete for origin and destination inputs
    if (originInput) {
        setupAutocomplete(originInput);
    }
    
    if (destinationInput) {
        setupAutocomplete(destinationInput);
    }
    
    // Initialize map
    initializeMap();
});

// Initialize map
function initializeMap() {
    const mapContainer = document.getElementById('route-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-content">
                <div class="map-grid">
                    <!-- Simplified map representation for Kigali -->
                    <div class="map-row">
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal traffic-medium"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                    </div>
                    <div class="map-row">
                        <div class="map-cell road-vertical"></div>
                        <div class="map-cell intersection"></div>
                        <div class="map-cell road-vertical"></div>
                        <div class="map-cell intersection"></div>
                        <div class="map-cell road-vertical"></div>
                    </div>
                    <div class="map-row">
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal traffic-high"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                    </div>
                    <div class="map-row">
                        <div class="map-cell road-vertical"></div>
                        <div class="map-cell intersection"></div>
                        <div class="map-cell road-vertical"></div>
                        <div class="map-cell intersection"></div>
                        <div class="map-cell road-vertical"></div>
                    </div>
                    <div class="map-row">
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal traffic-low"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                        <div class="map-cell road-horizontal"></div>
                    </div>
                </div>
                <div class="map-legend">
                    <div class="legend-item">
                        <div class="traffic-indicator traffic-low"></div>
                        <span>Low Traffic</span>
                    </div>
                    <div class="legend-item">
                        <div class="traffic-indicator traffic-medium"></div>
                        <span>Medium Traffic</span>
                    </div>
                    <div class="legend-item">
                        <div class="traffic-indicator traffic-high"></div>
                        <span>High Traffic</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Set up autocomplete for input fields
function setupAutocomplete(inputElement) {
    // Use Kigali locations from main.js if available
    let locations = window.KigaliTrafficApp && window.KigaliTrafficApp.KIGALI_LOCATIONS 
        ? window.KigaliTrafficApp.KIGALI_LOCATIONS 
        : [
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
            "Presidential Palace"
        ];
    
    // Create datalist element
    const datalistId = inputElement.id + '-list';
    let datalist = document.getElementById(datalistId);
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = datalistId;
        document.body.appendChild(datalist);
    }
    
    // Add options to datalist
    datalist.innerHTML = '';
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        datalist.appendChild(option);
    });
    
    // Set input attributes
    inputElement.setAttribute('list', datalistId);
}

// Find the best route based on traffic data
async function findBestRoute() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    
    if (!origin || !destination) {
        alert('Please enter both origin and destination');
        return;
    }
    
    try {
        // Show loading state
        const routeResults = document.getElementById('route-results');
        routeResults.innerHTML = '<div class="loading">Finding the best route...</div>';
        
        // In a real implementation, this would call the backend API
        // For now, we'll simulate the response with sample data
        setTimeout(() => {
            displayRouteOptions(generateSampleRoutes(origin, destination));
        }, 1500);
        
        // Update map to show route
        updateMapWithRoute();
    } catch (error) {
        console.error('Error finding route:', error);
        document.getElementById('route-results').innerHTML = 
            '<div class="error">Error finding route. Please try again.</div>';
    }
}

// Generate sample routes for demonstration
function generateSampleRoutes(origin, destination) {
    return [
        {
            id: 1,
            name: "Fastest Route",
            time: "15 min",
            distance: "8.2 km",
            traffic: "low",
            details: "Via KN 3 and KN 5 - Main roads with minimal traffic",
            waypoints: ["Turn left on KN 3", "Continue on KN 5", "Arrive at destination"]
        },
        {
            id: 2,
            name: "Shortest Route",
            time: "18 min",
            distance: "6.7 km",
            traffic: "medium",
            details: "Via KN 1 and KN 7 - Direct route with some traffic",
            waypoints: ["Turn right on KN 1", "Take ramp to KN 7", "Arrive at destination"]
        },
        {
            id: 3,
            name: "Eco-Friendly Route",
            time: "22 min",
            distance: "9.5 km",
            traffic: "low",
            details: "Via KN 2 and KN 8 - Scenic route with minimal emissions",
            waypoints: ["Turn left on KN 2", "Continue on KN 8", "Arrive at destination"]
        }
    ];
}

// Display route options
function displayRouteOptions(routes) {
    const routeResults = document.getElementById('route-results');
    
    if (!routes || routes.length === 0) {
        routeResults.innerHTML = '<div class="no-routes">No routes found. Please try different locations.</div>';
        return;
    }
    
    let html = '';
    routes.forEach((route, index) => {
        html += `
            <div class="route-option fade-in" data-route-id="${route.id}">
                <div class="route-summary">
                    <h4>${route.name}</h4>
                    <div>
                        <span class="route-time">${route.time}</span>
                        <span class="route-distance">${route.distance}</span>
                    </div>
                </div>
                <div class="route-details">
                    <span class="traffic-indicator traffic-${route.traffic}"></span>
                    ${route.details}
                </div>
                <div class="route-waypoints">
                    ${route.waypoints.map(waypoint => `<div class="waypoint">${waypoint}</div>`).join('')}
                </div>
            </div>
        `;
    });
    
    routeResults.innerHTML = html;
    
    // Add event listeners to route options
    document.querySelectorAll('.route-option').forEach(option => {
        option.addEventListener('click', function() {
            // Highlight selected route
            document.querySelectorAll('.route-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update map to show selected route
            const routeId = this.getAttribute('data-route-id');
            updateMapWithRoute(routeId);
        });
    });
}

// Update map with route visualization
function updateMapWithRoute(routeId = 1) {
    // In a real implementation, this would update the map to show the selected route
    // For now, we'll just add a visual indicator to show the map is updated
    const mapContainer = document.getElementById('route-map');
    if (mapContainer) {
        const routeIndicator = document.createElement('div');
        routeIndicator.className = 'route-indicator';
        routeIndicator.textContent = `Route ${routeId} selected`;
        routeIndicator.style.position = 'absolute';
        routeIndicator.style.bottom = '10px';
        routeIndicator.style.right = '10px';
        routeIndicator.style.backgroundColor = '#006600';
        routeIndicator.style.color = 'white';
        routeIndicator.style.padding = '5px 10px';
        routeIndicator.style.borderRadius = '4px';
        routeIndicator.style.fontSize = '12px';
        
        // Remove existing indicator if present
        const existingIndicator = mapContainer.querySelector('.route-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        mapContainer.appendChild(routeIndicator);
    }
}

// Geolocation functionality for driver location tracking
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log(`Current location: ${lat}, ${lng}`);
                // Update origin input with current location
                document.getElementById('origin').value = `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
            },
            error => {
                console.error('Error getting location:', error);
                alert('Unable to get current location. Please enter manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Real-time traffic data integration
function setupRealTimeTrafficUpdates() {
    // In a real implementation, this would connect to WebSocket for real-time updates
    // For now, we'll simulate periodic updates
    setInterval(() => {
        console.log('Updating traffic data...');
        // Update map with new traffic data
        updateTrafficOnMap();
    }, 30000); // Update every 30 seconds
}

// Update traffic visualization on map
function updateTrafficOnMap() {
    // In a real implementation, this would update traffic visualization based on real-time data
    console.log('Traffic data updated');
}

// Initialize real-time updates
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeTrafficUpdates();
});