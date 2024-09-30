document.addEventListener('DOMContentLoaded', function() {
    fetchProducts(1);
    populateStatusDropdown();

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
        const url = id ? `/product1/${id}/` : '/product1/';

        const data = {
            product: document.getElementById('product').value,
            description: document.getElementById('description').value,
            cost: document.getElementById('cost').value,
            revenue: document.getElementById('revenue').value,
            startdate: document.getElementById('startdate').value,
            enddate: document.getElementById('enddate').value,
            superior: document.getElementById('superior').value,
            status: document.getElementById('status').value,
        };

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        });

        fetchProducts(1);
        closeModal();
    };

    document.querySelector('.close').onclick = closeModal;

    document.getElementById('model').addEventListener('click', function(event) {
        if (event.target === this) closeModal();
    });

    document.getElementById('add').onclick = function() {
        clearForm();
        openProductModal();
    };
});

async function fetchProducts(page) {
    const response = await fetch(`/product1/?page=${page}`);
    const data = await response.json();

    const tableData = data.results;
    const tablebody = document.getElementById('table-body');
    tablebody.innerHTML = '';

    tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.product}</td>
            <td>${item.description}</td>
            <td>₹${item.cost}</td>
            <td>₹${item.revenue}</td>
            <td>${new Date(item.startdate).toLocaleDateString()}</td>
            <td>${new Date(item.enddate).toLocaleDateString()}</td>
            <td>${item.superior}</td>
            <td>${item.status}</td>
            <td>
                <button class="btnedit" onclick="openEditModal(${item.id})">Edit</button>
                <button class="btndel" onclick="deleteProduct(${item.id})">Delete</button>
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
        button.onclick = () => fetchProducts(i);
        if (i === page) button.classList.add('active');
        pagination.appendChild(button);
    }
}

async function openEditModal(id) {
    const response = await fetch(`/product1/${id}`);
    const data = await response.json();

    document.getElementById('itemid').value = data.id;
    document.getElementById('product').value = data.product;
    document.getElementById('description').value = data.description;
    document.getElementById('cost').value = data.cost;
    document.getElementById('revenue').value = data.revenue;
    document.getElementById('startdate').value = new Date(data.startdate).toLocaleDateString();
    document.getElementById('enddate').value = new Date(data.enddate).toLocaleDateString();
    document.getElementById('superior').value = data.superior;
    document.getElementById('status').value = data.status;

    openProductModal();
}

async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const response = await fetch(`/product1/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        });
        if (response.ok) fetchProducts(1);
        else alert("An error occurred while trying to delete the entry.");
    }
}

function openProductModal() {
    document.getElementById('model').style.display = 'block';
}

function clearForm() {
    ['itemid', 'product', 'description', 'cost', 'revenue', 'startdate', 'enddate', 'superior', 'status'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function closeModal() {
    document.getElementById('model').style.display = 'none';
}
function populateStatusDropdown() {
    const statuses = [
        { value: 'ongoing', text: 'Ongoing' },
        { value: 'completed', text: 'Completed' },
        { value: 'upcoming', text: 'Upcoming' },
    ];
    const statusDropdown = document.getElementById('status');
    statuses.forEach(status => {
        const option = document.createElement('option');
        option.value = status.value;
        option.textContent = status.text;
        statusDropdown.appendChild(option);
    });
}