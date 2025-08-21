// Kigali Traffic Management System - Analytics JavaScript

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the analytics page
    initializeAnalytics();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial charts
    renderAnalyticsCharts();
});

// Initialize the analytics page
function initializeAnalytics() {
    console.log('Kigali Traffic Analytics System initialized');
    
    // Set up periodic data updates
    setInterval(updateAnalyticsData, 60000); // Update every minute
}

// Set up event listeners
function setupEventListeners() {
    const dateRangeSelect = document.getElementById('date-range');
    const roadSelect = document.getElementById('road-selection');
    const refreshButton = document.getElementById('refresh-data');
    
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', renderAnalyticsCharts);
    }
    
    if (roadSelect) {
        roadSelect.addEventListener('change', renderAnalyticsCharts);
    }
    
    if (refreshButton) {
        refreshButton.addEventListener('click', renderAnalyticsCharts);
    }
}

// Update analytics data
function updateAnalyticsData() {
    // In a real implementation, this would fetch updated analytics data
    console.log('Analytics data updated');
    
    // Re-render charts with updated data
    renderAnalyticsCharts();
}

// Render analytics charts
function renderAnalyticsCharts() {
    // Render peak hours chart
    renderPeakHoursChart();
    
    // Render daily traffic chart
    renderDailyTrafficChart();
    
    // Render speed trends chart
    renderSpeedTrendsChart();
    
    // Render violation types chart
    renderViolationTypesChart();
    
    console.log('Analytics charts rendered');
}

// Render peak hours chart
function renderPeakHoursChart() {
    const chartContainer = document.getElementById('peakHoursChart');
    if (!chartContainer) return;
    
    // Clear previous chart if exists
    chartContainer.innerHTML = '';
    
    // Generate sample data for peak hours
    const hours = [];
    const vehicleCounts = [];
    
    for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`);
        // Simulate peak hours around 7-9 AM and 5-7 PM
        if ((i >= 7 && i <= 9) || (i >= 17 && i <= 19)) {
            vehicleCounts.push(Math.floor(Math.random() * 200) + 300);
        } else {
            vehicleCounts.push(Math.floor(Math.random() * 100) + 50);
        }
    }
    
    // Create chart
    const ctx = chartContainer.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: [{
                label: 'Vehicle Count',
                data: vehicleCounts,
                backgroundColor: '#006600',
                borderColor: '#004d00',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Vehicle Count'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Hour of Day'
                    }
                }
            }
        }
    });
}

// Render daily traffic chart
function renderDailyTrafficChart() {
    const chartContainer = document.getElementById('dailyTrafficChart');
    if (!chartContainer) return;
    
    // Clear previous chart if exists
    chartContainer.innerHTML = '';
    
    // Generate sample data for daily traffic
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const vehicleCounts = [];
    
    days.forEach(day => {
        // Simulate higher traffic on weekdays
        if (day !== 'Saturday' && day !== 'Sunday') {
            vehicleCounts.push(Math.floor(Math.random() * 1000) + 12000);
        } else {
            vehicleCounts.push(Math.floor(Math.random() * 500) + 8000);
        }
    });
    
    // Create chart
    const ctx = chartContainer.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Daily Traffic Volume',
                data: vehicleCounts,
                borderColor: '#006600',
                backgroundColor: 'rgba(0, 102, 0, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Vehicle Count'
                    }
                }
            }
        }
    });
}

// Render speed trends chart
function renderSpeedTrendsChart() {
    const chartContainer = document.getElementById('speedTrendsChart');
    if (!chartContainer) return;
    
    // Clear previous chart if exists
    chartContainer.innerHTML = '';
    
    // Generate sample data for speed trends
    const hours = [];
    const averageSpeeds = [];
    
    for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`);
        // Simulate speed variations throughout the day
        if ((i >= 7 && i <= 9) || (i >= 17 && i <= 19)) {
            // Rush hours - slower speeds
            averageSpeeds.push(Math.floor(Math.random() * 10) + 15);
        } else if (i >= 10 && i <= 16) {
            // Midday - moderate speeds
            averageSpeeds.push(Math.floor(Math.random() * 15) + 25);
        } else {
            // Off-peak - faster speeds
            averageSpeeds.push(Math.floor(Math.random() * 20) + 30);
        }
    }
    
    // Create chart
    const ctx = chartContainer.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Average Speed (km/h)',
                data: averageSpeeds,
                borderColor: '#006600',
                backgroundColor: 'rgba(0, 102, 0, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Speed (km/h)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Hour of Day'
                    }
                }
            }
        }
    });
}

// Render violation types chart
function renderViolationTypesChart() {
    const chartContainer = document.getElementById('violationTypesChart');
    if (!chartContainer) return;
    
    // Clear previous chart if exists
    chartContainer.innerHTML = '';
    
    // Generate sample data for violation types
    const violationTypes = ['Speeding', 'Red Light', 'Wrong Way', 'Illegal Parking', 'No Seatbelt'];
    const violationCounts = [45, 32, 18, 67, 23];
    
    // Create chart
    const ctx = chartContainer.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: violationTypes,
            datasets: [{
                data: violationCounts,
                backgroundColor: [
                    '#006600',
                    '#2c3e50',
                    '#e74c3c',
                    '#f39c12',
                    '#3498db'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Kigali-specific analytics data
const KIGALI_ANALYTICS_DATA = {
    peakHours: {
        morning: "7:00 AM - 9:00 AM",
        evening: "5:00 PM - 7:00 PM"
    },
    busiestRoads: [
        "KN 1 (Kigali-Nyanza Road)",
        "KN 5 (Kigali-Musanze Road)",
        "Airport Road",
        "KG 1 (Kigali City Center)"
    ],
    seasonalPatterns: {
        drySeason: "June - September: Increased traffic due to tourism",
        rainySeason: "March - May: Slower speeds due to road conditions"
    }
};

// Export functions for use in other modules
window.KigaliAnalytics = {
    renderAnalyticsCharts,
    updateAnalyticsData,
    KIGALI_ANALYTICS_DATA
};