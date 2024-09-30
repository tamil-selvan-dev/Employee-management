document.addEventListener('DOMContentLoaded', function() {
    fetchTasks(1);
    fetchProducts();

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

    document.getElementById('modalform').onsubmit = async function(event) {
        event.preventDefault();
        const id = document.getElementById('itemid').value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/task2/${id}/` : '/task2/';

        const data = {
            pro_id: document.getElementById('pro_id').value,
            task: document.getElementById('task').value,
            emp_id: document.getElementById('emp_id').value.split(',').map(Number),
            assigned: document.getElementById('assigned').value,
            deadline: document.getElementById('deadine').value,
            completion: document.getElementById('completion').value,
            superior: document.getElementById('superior').value,
        };

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        });

        fetchTasks(1);
        closeModal();
    };

    document.querySelector('.close').onclick = closeModal;

    document.getElementById('model').addEventListener('click', function(event) {
        if (event.target === this) closeModal();
    });

    document.getElementById('add').onclick = function() {
        clearForm();
        openTaskModal();
    };
});

async function fetchTasks(page) {
    const response = await fetch(`/task2/?page=${page}`);
    const data = await response.json();

    const tableData = data.results;
    const tablebody = document.getElementById('table-body');
    tablebody.innerHTML = '';

    tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.pro_id}</td>
            <td>${item.task}</td>
            <td>${item.emp_id.join(', ')}</td>
            <td>${item.assigned}</td>
            <td>${item.deadline}</td>
            <td>${item.completion}%</td>
            <td>${item.superior}</td>
            <td>
                <button class="btnedit" onclick="openEditModal(${item.id})">Edit</button>
                <button class="btndel" onclick="deleteTask(${item.id})">Delete</button>
            </td>
        `;
        tablebody.appendChild(row);
    });

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(data.count / 5);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => fetchTasks(i);
        if (i === page) button.classList.add('active');
        pagination.appendChild(button);
    }
}

async function fetchProducts() {
    const response = await fetch('/product1/');
    const products = await response.json();
    const proDropdown = document.getElementById('pro_id');

    products.results.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.product; 
        proDropdown.appendChild(option);
    });
}

async function openEditModal(id) {
    const response = await fetch(`/task2/${id}`);
    const data = await response.json();

    document.getElementById('itemid').value = data.id;
    document.getElementById('pro_id').value = data.pro_id;
    document.getElementById('task').value = data.task;
    document.getElementById('emp_id').value = data.emp_id.join(', ');
    document.getElementById('assigned').value = data.assigned;
    document.getElementById('deadine').value = data.deadline;
    document.getElementById('completion').value = data.completion;
    document.getElementById('superior').value = data.superior;

    openTaskModal();
}

async function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        const response = await fetch(`/task2/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        });
        if (response.ok) fetchTasks(1);
        else alert("An error occurred while trying to delete the task.");
    }
}

function openTaskModal() {
    document.getElementById('model').style.display = 'block';
}

function clearForm() {
    ['itemid', 'pro_id', 'task', 'emp_id', 'assigned', 'deadine', 'completion', 'superior'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function closeModal() {
    document.getElementById('model').style.display = 'none';
}
