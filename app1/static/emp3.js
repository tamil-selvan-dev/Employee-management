let currentpage=1;
document.addEventListener('DOMContentLoaded', function() {
    fetchDetails(currentpage);

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

function fetchDetails(page) {
    currentpage=page
    fetch(`/details/?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = '';

            if (Array.isArray(data.results)) {
                data.results.forEach(details => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${details.user_id}</td>
                        <td>${details.name1}</td>
                        <td>₹${details.salary}</td>
                        <td>${details.position}</td>
                        <td class="${getPerformanceClass(details.performance)}">${details.performance}%</td>
                        <td>${details.joindate}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                console.error('Expected an array for results:', data.results);
            }

            setupPagination(data);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function setupPagination(data) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; 
    const totalPages = Math.ceil(data.count / 5);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className=(i===currentpage)?'active':'';
        pageButton.onclick = () => fetchDetails(i);
        paginationContainer.appendChild(pageButton);
    }
}
function getPerformanceClass(performance) {
    if (performance > 90) {
        return 'performance-excellent';
    } else if (performance > 80) {
        return 'performance-good';
    } else if (performance > 70) {
        return 'performance-average';
    } else {
        return 'performance-poor';
    }
}