async function fetchEmployeeCount() {
    try {
        const response = await fetch('/details/empcount');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching employee count data", error);
        return null;
    }
}

async function emptot() {
    const data = await fetchEmployeeCount();
    if (data) {
        document.getElementById('tot-emp').innerHTML = data.total_employees_count;
    }
}
emptot();

async function emprec() {
    try {
        const response = await fetch('/jobs/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const con = document.getElementsByClassName('con2')[0];
        con.innerHTML = '';

        data.forEach(job => {
            const row = document.createElement('p');
            row.innerHTML = `<div class="p1"><i class="material-icons per">work</i> ${job.position}</div> : ${job.requires}`;
            con.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching job data", error);
    }
}
emprec();

async function fetchdisp() {
    const data = await fetchEmployeeCount();
    if (data) {
        const con3 = document.getElementsByClassName('con3')[0];
        con3.innerHTML = '';

        data.position_details.forEach(item => {
            const row = document.createElement('p');
            row.innerHTML = `<div class="p3">${item.position}</div> : ${item.count}`;
            con3.appendChild(row);
        });
    }
}
fetchdisp();

async function fetchdisp1() {
    const data = await fetchEmployeeCount();
    if (data) {
        const labels = data.position_details.map(item => item.position);
        const counts = data.position_details.map(item => item.count);
        renderChart(labels, counts);
    }
}
fetchdisp1();

function renderChart(labels, counts) {
    const ctx = document.getElementById('positionchart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Employees',
                data: counts,
                backgroundColor: 'skyblue',
                borderColor: 'gray',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            const dropdown = document.getElementById('dropdown-content');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        window.onclick = function(event) {
            if (!event.target.matches('#user-icon')) {
                const dropdowns = document.getElementsByClassName('dropdown-content');
                for (let i = 0; i < dropdowns.length; i++) {
                    dropdowns[i].style.display = 'none';
                }
            }
        };
    } else {
        console.error("User icon not found");
    }
});
