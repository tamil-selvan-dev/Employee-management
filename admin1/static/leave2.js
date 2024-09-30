async function fetchleave() {
    const response = await fetch('/leave1/');
    const data = await response.json();
    const empleavelist = document.getElementById('table-body');

    function renderleave() {
        empleavelist.innerHTML = '';
        let hasTasks = false;

        data.forEach(leave => {
            const empId = leave.emp_id;
            if (empId === parseInt(loggedInUserId)) {
                hasTasks = true;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${leave.emp_id}</td>
                    <td>${leave.name}</td>
                    <td>${leave.leave1}</td>
                    <td>${leave.date1}</td>
                    <td>${leave.permission}</td>
                `;
                empleavelist.appendChild(row);
            }
        });

        if (!hasTasks) {
            empleavelist.innerHTML = '<tr><td colspan="5">No leaves found for this user.</td></tr>';
        }
    }

    renderleave();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchleave();

    const modal = document.getElementById('model');
    const addButton = document.getElementById('add');
    const closeButton = document.querySelector('.close');

    addButton.addEventListener('click', function() {
        document.getElementById('date1').value='';
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById('modalform').addEventListener('submit', async function(event) {
        event.preventDefault(); 
        const leaveType = document.getElementById('leave1').value;
        const leaveDate = document.getElementById('date1').value;

        const response = await fetch('/leave3/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                emp_id: loggedInUserId,
                leave1: leaveType,
                date1: leaveDate,
            }),
        });

        if (response.ok) {
            fetchleave();
            modal.style.display = 'none';
            document.getElementById('modalform').reset();
        } else {
            console.error('Failed to apply for leave');
        }
    });
    const userIcon = document.getElementById('user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            const dropdown = document.getElementById('dropdown-content');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

    window.onclick = function(event) {
        if (!event.target.matches('#user-icon')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].style.display = 'none';
            }
        }
    };

});
