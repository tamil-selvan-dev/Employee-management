async function fetchtask() {
    const response = await fetch('/task1/');
    const tasks = await response.json();

    const emptasklist = document.getElementById('emp-task-list');
    console.log('Logged-in User ID:', loggedInUserId);

    const taskbyemployee = tasks.flatMap(task => {
        return task.employees.map(emp => ({
            id: task.id,
            empdetails: `${emp.id}-${emp.name}`,
            product1: task.product1,
            task: task.task,
            assigned: task.assigned,
            deadline: task.deadline,
            completion: task.completion,
            superior: task.superior
        }));
    });

    function renderTasks() {
        emptasklist.innerHTML = '';

        let hasTasks = false;

        taskbyemployee.forEach(task => {
            const empId = task.empdetails.split('-')[0];
            if (empId === loggedInUserId) {
                hasTasks = true;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.empdetails}</td>
                    <td>${task.product1}</td>
                    <td>${task.task}</td>
                    <td>${task.assigned}</td>
                    <td>${task.deadline}</td>
                    <td>${task.completion}%</td>
                    <td>${task.superior}</td>
                `;
                emptasklist.appendChild(row);
            }
        });

        if (!hasTasks) {
            emptasklist.innerHTML = '<tr><td colspan="8">No tasks found for this user.</td></tr>';
        }
    }

    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchtask();

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
