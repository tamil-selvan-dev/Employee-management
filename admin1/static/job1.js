document.addEventListener('DOMContentLoaded', function() {
    fetchjob(1);

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
        const url = id ? `/jobs2/${id}/` : '/jobs2/';

        const data = {
            position: document.getElementById('position').value,
            requires: document.getElementById('requires').value,
        };

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        });

        fetchjob(1);
        closeModal();
    };

    document.querySelector('.close').onclick = closeModal;

    document.getElementById('model').addEventListener('click', function(event) {
        if (event.target === this) closeModal();
    });

    document.getElementById('add').onclick = function() {
        clearForm();
        openempmodal();
    };
});

async function fetchjob(page) {
    const response = await fetch(`/jobs2/?page=${page}`);
    const data = await response.json();

    console.log(data);

    const tableData = data.results;

    const tablebody = document.getElementById('table-body');
    tablebody.innerHTML = '';

    tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.position}</td>
            <td>${item.requires}</td>
            <td>
                <button class="btnedit" onclick="openeditmodal(${item.id})">Edit</button>
                <button class="btndel" onclick="deletemodal(${item.id})">Delete</button>
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
        button.onclick = () => fetchjob(i);
        if (i === page) button.classList.add('active');
        pagination.appendChild(button);
    }
}

async function openeditmodal(id) {
    const response = await fetch(`/jobs2/${id}`);
    const data = await response.json();

    document.getElementById('itemid').value = data.id;
    document.getElementById('position').value = data.position;
    document.getElementById('requires').value = data.requires;
    
    openempmodal();
}

async function deletemodal(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const response = await fetch(`/jobs2/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        });
        if (response.ok) fetchjob(1);
        else alert("An error occurred while trying to delete the entry.");
    }
}

function openempmodal(selectedUserId = null) {
    document.getElementById('model').style.display = 'block';
    fetchusers(selectedUserId);
}

function clearForm() {
    ['itemid','position','requires'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function closeModal() {
    document.getElementById('model').style.display = 'none';
}
