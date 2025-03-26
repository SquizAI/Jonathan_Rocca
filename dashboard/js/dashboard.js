document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Navigation between tabs
    const navLinks = ['dashboard-link', 'leads-link', 'campaigns-link', 'conversations-link', 'analytics-link', 'settings-link'];
    const contentDivs = ['dashboard-content', 'leads-content', 'campaigns-content', 'conversations-content', 'analytics-content', 'settings-content'];
    
    navLinks.forEach((linkId, index) => {
        document.getElementById(linkId).addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all content divs
            contentDivs.forEach(div => {
                document.getElementById(div).style.display = 'none';
            });
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                document.getElementById(link).parentElement.classList.remove('active');
            });
            
            // Show the selected content div
            document.getElementById(contentDivs[index]).style.display = 'block';
            
            // Add active class to the clicked nav link
            this.parentElement.classList.add('active');
        });
    });

    // Initialize charts
    initializeOutreachChart();
    initializeQualificationChart();
    initializeInsightsChart();
    initializeMap();

    // Initialize dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        new bootstrap.Dropdown(dropdown);
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });
});

// Outreach Chart
function initializeOutreachChart() {
    const options = {
        series: [
            {
                name: 'Sent Messages',
                data: [42, 53, 57, 69, 97, 118, 132, 146, 93, 89, 123, 110, 105, 115, 132, 144, 156, 158, 162, 165, 172, 178, 181, 184, 186, 189, 191, 194, 196, 199]
            },
            {
                name: 'Responses',
                data: [12, 14, 16, 19, 26, 35, 41, 47, 25, 24, 32, 29, 32, 34, 38, 42, 47, 49, 46, 48, 52, 54, 56, 58, 55, 52, 51, 49, 52, 53]
            },
            {
                name: 'Qualified Leads',
                data: [5, 6, 7, 8, 10, 13, 15, 16, 10, 9, 12, 10, 11, 12, 14, 16, 18, 19, 17, 18, 19, 20, 21, 22, 20, 19, 18, 17, 19, 20]
            }
        ],
        chart: {
            type: 'area',
            height: 300,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#3c68b1', '#2ecc71', '#f39c12'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: Array.from({length: 30}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (29 - i));
                return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
            }),
            labels: {
                rotate: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                style: {
                    fontSize: '10px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            padding: {
                left: 0,
                right: 0
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right'
        }
    };

    const chart = new ApexCharts(document.getElementById('outreach-chart'), options);
    chart.render();
}

// Qualification Chart
function initializeQualificationChart() {
    const options = {
        series: [44, 28, 18, 10],
        labels: ['Not Interested', 'Considering', 'Strong Interest', 'Ready to Sell'],
        chart: {
            type: 'donut',
            height: 300,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        colors: ['#e74c3c', '#f39c12', '#3498db', '#2ecc71'],
        legend: {
            position: 'bottom',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        value: {
                            show: true,
                            formatter: function(val) {
                                return val + '%';
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function() {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 250
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById('qualification-chart'), options);
    chart.render();
}

// Insights Chart
function initializeInsightsChart() {
    const options = {
        series: [{
            name: 'Frequency',
            data: [65, 52, 41, 37, 33, 25, 19, 13, 9]
        }],
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'top'
                },
                barHeight: '70%',
                borderRadius: 5
            },
        },
        colors: ['#3c68b1', '#4273bd', '#487ec9', '#4e89d6', '#5494e2', '#5a9fee', '#60aafb', '#66b5ff', '#6cc0ff'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            offsetX: 20,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            width: 0
        },
        grid: {
            borderColor: '#f1f1f1',
            padding: {
                left: 10,
                right: 10
            }
        },
        xaxis: {
            categories: [
                'Price too low',
                'Not selling now',
                'Already listed',
                'Need time to think',
                'Need to consult family',
                'Working with another agent',
                'Bad timing',
                'Property needs work',
                'Waiting for market changes'
            ],
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + '% of conversations';
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById('insights-chart'), options);
    chart.render();
}

// Map Initialization
function initializeMap() {
    // Check if Leaflet is loaded
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([34.0522, -118.2437], 10); // Los Angeles coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a sample heat map using circles to simulate density
        const locations = [
            {lat: 34.0522, lng: -118.2437, intensity: 100}, // Downtown LA
            {lat: 34.0211, lng: -118.4814, intensity: 80},  // Santa Monica
            {lat: 34.1478, lng: -118.1445, intensity: 60},  // Pasadena
            {lat: 33.9416, lng: -118.4085, intensity: 40},  // Inglewood
            {lat: 34.0901, lng: -118.3733, intensity: 90},  // Hollywood
            {lat: 33.8358, lng: -118.3406, intensity: 70},  // Torrance
            {lat: 34.1808, lng: -118.3090, intensity: 50},  // Burbank
            {lat: 33.7866, lng: -118.2987, intensity: 30},  // Long Beach
            {lat: 34.0194, lng: -118.4912, intensity: 85},  // Venice
            {lat: 34.0825, lng: -118.4324, intensity: 65},  // Beverly Hills
            {lat: 34.0696, lng: -118.4052, intensity: 75},  // Century City
            {lat: 34.0408, lng: -118.2661, intensity: 95}   // USC area
        ];

        // Add circles for each location
        locations.forEach(loc => {
            const radius = loc.intensity * 50; // Scale intensity to radius
            const opacity = loc.intensity / 100; // Scale intensity to opacity
            
            L.circle([loc.lat, loc.lng], {
                color: '#3c68b1',
                fillColor: '#3c68b1',
                fillOpacity: opacity,
                radius: radius
            }).addTo(map);
        });
    } else {
        console.error('Leaflet is not loaded');
    }
}

// Notifications functionality (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            alert('Notifications feature is under development');
        });
    }
});
