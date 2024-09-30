async function fetchtask() {
    const response = await fetch('/task1/');
    const tasks = await response.json();

    const producttasklist = document.getElementById('product-task-list');
    const emptasklist = document.getElementById('emp-task-list');
    const empcat = document.getElementById('empcat');

    const employeeIds = new Set();
    tasks.forEach(task => {
        task.employees.forEach(emp => {
            employeeIds.add(emp.id);
        });
    });

    employeeIds.forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = id;
        empcat.appendChild(option);
    });

    function renderTasks(selectedEmpId) {
        producttasklist.innerHTML = '';
        emptasklist.innerHTML = '';

        tasks.sort((a, b) => a.id - b.id);
        tasks.forEach(task => {
            const empdetails = task.employees.map(emp => `${emp.id}-${emp.name}`).join(', ');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.id}</td>
                <td class="pr">${task.product1}</td>
                <td>${task.task}</td>
                <td>${task.assigned}</td>   
                <td>${task.deadline}</td>
                <td>${task.completion}%</td>
                <td>${task.superior}</td>
                <td>${empdetails}</td>
            `;
            producttasklist.appendChild(row);
        });

        const taskbyemployee = tasks.flatMap(task => {
            return task.employees.map(emp => {
                return {
                    id: task.id,
                    empdetails: `${emp.id}-${emp.name}`,
                    product1:task.product1,
                    task: task.task,
                    assigned: task.assigned,
                    deadline: task.deadline,
                    completion: task.completion,
                    superior: task.superior
                };
            });
        });

        taskbyemployee.forEach(task => {
            const empId = task.empdetails.split('-')[0];
            if (selectedEmpId === '' || empId === selectedEmpId) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.id}</td>
                    <td class="pr">${task.empdetails}</td>
                    <td class="pr1">${task.product1}</td>
                    <td>${task.task}</td>
                    <td>${task.assigned}</td>
                    <td>${task.deadline}</td>
                    <td>${task.completion}%</td>
                    <td>${task.superior}</td>
                `;
                emptasklist.appendChild(row);
            }
        });
    }
    renderTasks('');

    empcat.addEventListener('change', (event) => {
        renderTasks(event.target.value);
    });
}

function opentab(evt, tabname) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', () => {
    fetchtask();

    document.getElementById('user-icon').addEventListener('click', function() {
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
});