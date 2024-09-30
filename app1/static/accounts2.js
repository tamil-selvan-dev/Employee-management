document.addEventListener('DOMContentLoaded', function() {
    const ctxProduct = document.getElementById('productchart').getContext('2d');
    const ctxRevenue = document.getElementById('revenuechart').getContext('2d');
    const container21 = document.querySelector('.container21');

    fetch('/product/')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(product => product.product);
            const costs = data.map(product => parseInt(product.cost));
            const revenues = data.map(product => parseInt(product.revenue));

            data.forEach(product => {
                const row = document.createElement('div');
                row.classList.add('product-row');
                row.innerHTML = `
                    <span class="pro-id">ID:${product.id}</span>
                    <span class="product">${product.product}</span>
                    <span class="cost"><p>COST:</p>₹${product.cost}</span>
                    <span class="revenue"><p>REVENUE:</p>₹${product.revenue}</span>
                `;
                container21.appendChild(row);
            });

            const productChart = new Chart(ctxProduct, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Product Cost',
                            data: costs,
                            backgroundColor: 'rgb(248, 109, 132)',
                            borderColor: 'gray',
                            borderWidth: 1
                        },
                        {
                            label: 'Product Revenue',
                            data: revenues,
                            backgroundColor: 'lightskyblue',
                            borderColor: 'gray',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Poppins',
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching product data:', error));

    fetch('/product/revenue_summary/')
        .then(response => response.json())
        .then(data => {
            const revenueChart = new Chart(ctxRevenue, {
                type: 'doughnut',
                data: {
                    labels: ['Total Cost', 'Total Revenue'],
                    datasets: [{
                        label: 'Financial Summary',
                        data: [data.total_cost, data.total_revenue],
                        backgroundColor: [
                            'rgb(248, 109, 132)',
                            'lightskyblue'
                        ],
                        borderColor: [
                            'gray',
                            'gray'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Poppins',
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching revenue summary data:', error));

        document.getElementById('user-icon').addEventListener('click', function() {
            var dropdown = document.getElementById('dropdown-content');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    
        window.onclick = function(event) {
            if (!event.target.matches('#user-icon')) {
                var dropdowns = document.getElementsByClassName('dropdown-content');
                for (var i = 0; i < dropdowns.length; i++) {
                    dropdowns[i].style.display = 'none';
                }
            }
        };
});
