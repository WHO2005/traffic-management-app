// Kigali Traffic Management System - Violations JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the violations page
    initializeViolations();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial violations data
    loadViolationsData();
});

// Initialize the violations page
function initializeViolations() {
    console.log('Kigali Traffic Violations System initialized');
    
    // Set up periodic data updates
    setInterval(loadViolationsData, 60000); // Update every minute
}

// Set up event listeners
function setupEventListeners() {
    const dateRangeSelect = document.getElementById('violation-date-range');
    const violationTypeSelect = document.getElementById('violation-type');
    const refreshButton = document.getElementById('refresh-violations');
    
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', loadViolationsData);
    }
    
    if (violationTypeSelect) {
        violationTypeSelect.addEventListener('change', loadViolationsData);
    }
    
    if (refreshButton) {
        refreshButton.addEventListener('click', loadViolationsData);
    }
}

// Load violations data
async function loadViolationsData() {
    try {
        // In a real implementation, this would fetch data from the backend
        // For now, we'll use simulated data
        
        // Show loading state
        const tableBody = document.querySelector('#violations-table tbody');
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="7" class="loading">Loading violations data...</td></tr>';
        }
        
        // Simulate API delay
        setTimeout(() => {
            // Generate sample violations data
            const violations = generateSampleViolations();
            
            // Display violations in table
            displayViolations(violations);
            
            // Update statistics
            updateViolationStatistics(violations);
        }, 1000);
        
    } catch (error) {
        console.error('Error loading violations data:', error);
        
        // Show error state
        const tableBody = document.querySelector('#violations-table tbody');
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="7" class="error">Error loading violations data. Please try again.</td></tr>';
        }
    }
}

// Generate sample violations data for Kigali
function generateSampleViolations() {
    const violationTypes = ['Speeding', 'Red Light', 'Wrong Way', 'Illegal Parking', 'No Seatbelt'];
    const locations = [
        'KN 1 & KN 5', 
        'Airport Road', 
        'Kimironko Market', 
        'City Center', 
        'Kicukiro Centre',
        'Gisozi Roundabout',
        'Remera Junction',
        'Nyabugogo Bus Station'
    ];
    const vehiclePlates = ['KAB 123A', 'KCD 456B', 'KDE 789C', 'KFG 012D', 'KHI 345E'];
    const statuses = ['pending', 'paid', 'disputed'];
    
    const violations = [];
    const count = Math.floor(Math.random() * 20) + 10; // 10-30 violations
    
    for (let i = 0; i < count; i++) {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24));
        timestamp.setMinutes(Math.floor(Math.random() * 60));
        
        violations.push({
            id: 1000 + i,
            location: locations[Math.floor(Math.random() * locations.length)],
            violationType: violationTypes[Math.floor(Math.random() * violationTypes.length)],
            vehiclePlate: vehiclePlates[Math.floor(Math.random() * vehiclePlates.length)],
            timestamp: timestamp.toLocaleString(),
            fineAmount: (Math.floor(Math.random() * 50) + 10) * 1000, // 10,000 - 60,000 RWF
            status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }
    
    return violations;
}

// Display violations in table
function displayViolations(violations) {
    const tableBody = document.querySelector('#violations-table tbody');
    if (!tableBody) return;
    
    if (!violations || violations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">No violations found.</td></tr>';
        return;
    }
    
    // Sort violations by timestamp (newest first)
    violations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    let html = '';
    violations.forEach(violation => {
        html += `
            <tr>
                <td>${violation.id}</td>
                <td>${violation.location}</td>
                <td>${violation.violationType}</td>
                <td>${violation.vehiclePlate}</td>
                <td>${violation.timestamp}</td>
                <td>RWF ${violation.fineAmount.toLocaleString()}</td>
                <td class="status-${violation.status}">${violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Update violation statistics
function updateViolationStatistics(violations) {
    if (!violations || violations.length === 0) return;
    
    // Update total violations
    const totalViolationsElement = document.querySelector('.stat-value:first-child');
    if (totalViolationsElement) {
        totalViolationsElement.textContent = violations.length;
    }
    
    // Find most common violation type
    const violationTypeCount = {};
    violations.forEach(violation => {
        violationTypeCount[violation.violationType] = (violationTypeCount[violation.violationType] || 0) + 1;
    });
    
    const mostCommonViolation = Object.keys(violationTypeCount).reduce((a, b) => 
        violationTypeCount[a] > violationTypeCount[b] ? a : b
    );
    
    const mostCommonElement = document.querySelectorAll('.stat-value')[1];
    if (mostCommonElement) {
        mostCommonElement.textContent = mostCommonViolation;
    }
    
    // Calculate total fines collected
    const totalFines = violations
        .filter(v => v.status === 'paid')
        .reduce((sum, v) => sum + v.fineAmount, 0);
    
    const totalFinesElement = document.querySelectorAll('.stat-value')[2];
    if (totalFinesElement) {
        totalFinesElement.textContent = `RWF ${totalFines.toLocaleString()}`;
    }
    
    // Count pending violations
    const pendingCount = violations.filter(v => v.status === 'pending').length;
    
    const pendingElement = document.querySelectorAll('.stat-value')[3];
    if (pendingElement) {
        pendingElement.textContent = pendingCount;
    }
}

// Kigali-specific violation data
const KIGALI_VIOLATION_DATA = {
    commonViolations: [
        {
            type: "Illegal Parking",
            locations: ["Kimironko Market", "City Center", "Kicukiro Centre"],
            fine: "RWF 20,000"
        },
        {
            type: "Speeding",
            locations: ["Airport Road", "KN 1", "KN 5"],
            fine: "RWF 30,000"
        },
        {
            type: "Red Light",
            locations: ["Nyabugogo Junction", "City Center"],
            fine: "RWF 25,000"
        }
    ],
    enforcementHours: {
        weekdays: "6:00 AM - 10:00 PM",
        weekends: "8:00 AM - 8:00 PM"
    }
};

// Export functions for use in other modules
window.KigaliViolations = {
    loadViolationsData,
    generateSampleViolations,
    displayViolations,
    updateViolationStatistics,
    KIGALI_VIOLATION_DATA
};