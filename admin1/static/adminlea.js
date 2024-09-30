async function fetchleave() {
    const response = await fetch('/leave1/');
    const data = await response.json();
    console.log("data", data);
    const empleavelist = document.getElementById('table-body');

    function renderleave() {
        empleavelist.innerHTML = ''; 

        data.forEach(leave => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${leave.emp_id}</td>
                <td>${leave.name}</td>
                <td>${leave.leave1}</td>
                <td>${leave.date1}</td>
                <td>${leave.permission}</td>
                <td><button class="access-button" data-id="${leave.id}" data-emp_id="${leave.emp_id}" data-leave="${leave.leave1}" data-date="${leave.date1}" data-permission="${leave.permission}">Access</button></td>
            `;
            empleavelist.appendChild(row);
        });
    }

    renderleave();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchleave();

    const modal = document.getElementById('model');
    const closeButton = document.querySelector('.close');

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById('table-body').addEventListener('click', function(event) {
        if (event.target.classList.contains('access-button')) {
            const button = event.target;
            const empId = button.getAttribute('data-emp_id');
            const leaveType = button.getAttribute('data-leave');
            const leaveDate = button.getAttribute('data-date');
            const permission = button.getAttribute('data-permission');
            const leaveId = button.getAttribute('data-id');

            document.getElementById('emp_id').value = empId;
            document.getElementById('leave1').value = leaveType;
            document.getElementById('date1').value = leaveDate;
            document.getElementById('itemid').value = leaveId;
            document.getElementById('Permission').innerHTML = `
                <option value="pending" ${permission === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="yes" ${permission === 'yes' ? 'selected' : ''}>Yes</option>
                <option value="no" ${permission === 'no' ? 'selected' : ''}>No</option>
            `;

            modal.style.display = 'block';
        }
    });

    document.getElementById('modalform').addEventListener('submit', async function(event) {
        event.preventDefault(); 
        const empId = parseInt(document.getElementById('emp_id').value);
        const leaveType = document.getElementById('leave1').value;
        const leaveDate = document.getElementById('date1').value;
        const permission = document.getElementById('Permission').value;
        const leaveId = parseInt(document.getElementById('itemid').value);

        const payload = {
            emp_id: empId,
            leave1: leaveType,
            date1: leaveDate,
            permission: permission
        };
    
        console.log("Sending payload:", JSON.stringify(payload));

        const response = await fetch(`/leave3/${leaveId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            fetchleave(); 
            modal.style.display = 'none'; 
            document.getElementById('modalform').reset(); 
        } else {
            console.error('Failed to update permission');
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
