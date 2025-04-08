document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });

    // Menu navigation
    const menuItems = ['dashboard', 'leads', 'campaigns', 'conversations', 'analytics', 'settings'];
    
    menuItems.forEach(item => {
        const link = document.getElementById(`${item}-link`);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide all content pages
                document.querySelectorAll('.page-content').forEach(el => {
                    el.style.display = 'none';
                });
                
                // Show selected content
                document.getElementById(`${item}-content`).style.display = 'block';
                
                // Update active menu
                document.querySelectorAll('#sidebar ul li').forEach(el => {
                    el.classList.remove('active');
                });
                this.parentElement.classList.add('active');
            });
        }
    });

    // Sample data for charts (would be replaced with real data in production)
    if (document.getElementById('outreach-chart')) {
        const outreachChart = new ApexCharts(document.getElementById('outreach-chart'), {
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            series: [{
                name: 'Messages Sent',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 160, 180]
            }, {
                name: 'Responses',
                data: [15, 20, 18, 32, 29, 35, 45, 50, 68, 82, 95, 110]
            }],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            colors: ['#3498db', '#2ecc71'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.4,
                    opacityFrom: 0.9,
                    opacityTo: 0.6,
                }
            }
        });
        outreachChart.render();
    }

    if (document.getElementById('qualification-chart')) {
        const qualificationChart = new ApexCharts(document.getElementById('qualification-chart'), {
            chart: {
                type: 'donut',
                height: 350
            },
            series: [44, 25, 18, 13],
            labels: ['High Interest', 'Medium Interest', 'Low Interest', 'Not Interested'],
            colors: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c'],
            legend: {
                position: 'bottom'
            }
        });
        qualificationChart.render();
    }

    // Initialize map if element exists
    if (document.getElementById('map')) {
        const map = L.map('map').setView([34.0522, -118.2437], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Sample heat map data - would be replaced with real data
        const points = [
            [34.052, -118.243, 0.8], // Los Angeles
            [34.060, -118.250, 0.6],
            [34.045, -118.235, 0.5],
            [34.065, -118.260, 0.7],
            [34.055, -118.270, 0.9],
            [34.040, -118.230, 0.3]
        ];
        
        // Add markers for visualization
        points.forEach(point => {
            L.circle([point[0], point[1]], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: point[2],
                radius: 500 * point[2]
            }).addTo(map);
        });
    }
});
