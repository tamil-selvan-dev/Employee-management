document.addEventListener('DOMContentLoaded', function() {
    fetchemployee(1);

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
        const url = id ? `/work2/${id}/` : '/work2/';

        const data = {
            user_id: document.getElementById('user_id').value,
            salary: document.getElementById('salary').value,
            position: document.getElementById('position').value,
            performance: document.getElementById('performance').value,
            joindate: document.getElementById('joindate').value,
        };

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        });

        fetchemployee(1);
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

async function fetchemployee(page) {
    const response = await fetch(`/work1/?page=${page}`);
    const data = await response.json();

    console.log(data);

    const tableData = data.results;

    const tablebody = document.getElementById('table-body');
    tablebody.innerHTML = '';

    tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name1}</td>
            <td>₹${item.salary}</td>
            <td>${item.position}</td>
            <td>${item.performance}%</td>
            <td>${item.joindate}</td>
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
        button.onclick = () => fetchemployee(i);
        if (i === page) button.classList.add('active');
        pagination.appendChild(button);
    }
}

async function openeditmodal(id) {
    const response = await fetch(`/work2/${id}`);
    const data = await response.json();

    document.getElementById('itemid').value = data.id;
    document.getElementById('user_id').value = data.user_id;
    document.getElementById('salary').value = data.salary;
    document.getElementById('position').value = data.position;
    document.getElementById('performance').value = data.performance;
    document.getElementById('joindate').value = data.joindate;

    openempmodal(data.user_id);
}

async function deletemodal(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const response = await fetch(`/work2/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        });
        if (response.ok) fetchemployee();
        else alert("An error occurred while trying to delete the entry.");
    }
}

function openempmodal(selectedUserId = null) {
    document.getElementById('model').style.display = 'block';
    fetchusers(selectedUserId);
}

async function fetchusers(selectedUserId) {
    const response = await fetch('/user/');
    const users = await response.json();
    const userdropdown = document.getElementById('user_id');
    userdropdown.innerHTML = '';

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.id}, ${user.name}`;
        userdropdown.appendChild(option);
    });

    if (selectedUserId !== null) userdropdown.value = selectedUserId;
}

function clearForm() {
    ['itemid', 'user_id', 'salary', 'position', 'performance', 'joindate'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function closeModal() {
    document.getElementById('model').style.display = 'none';
}




/*
document.addEventListener('DOMContentLoaded', function() {
    fetchemployee();

    document.getElementById('modalform').onsubmit = async function (event) {
        event.preventDefault();
        const id = document.getElementById('itemid').value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/work2/${id}/` : '/work2/';

        const data = {
            user_id: document.getElementById('user_id').value,
            salary: document.getElementById('salary').value,
            position: document.getElementById('position').value,
            performance: document.getElementById('performance').value,
            joindate: document.getElementById('joindate').value,
        };

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken
            },
            body: JSON.stringify(data)
        });

        fetchemployee();
        document.getElementById('model').style.display = 'none';
    };

    document.querySelector('.close').onclick = function() {
        document.getElementById('model').style.display = 'none';
    };

    const modal=document.getElementById('model');
    modal.addEventListener('click',function(event){
        if(event.target===modal){
            modal.style.display='none';
        }
    });

    document.getElementById('add').onclick = function() {
        clearForm();
        openempmodal();
    };
});

async function fetchemployee() {
    const response=await fetch('/work1/');
    const data=await response.json();
    const tablebody=document.getElementById('table-body');
    tablebody.innerHTML='';

    data.forEach(item => {
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${item.id}</td>
            <td>${item.name1}</td>
            <td>${item.salary}</td>
            <td>${item.position}</td>
            <td>${item.performance}</td>
            <td>${item.joindate}</td>
            <td>
                <button onclick="openeditmodal(${item.id})">Edit</button>
                <button onclick="deletemodal(${item.id})">Delete</button>
            </td>
        `;
        tablebody.appendChild(row);
    });
}

async function openeditmodal(id) {
    const response=await fetch(`/work2/${id}`);
    const data=await response.json();

    document.getElementById('itemid').value=data.id;
    document.getElementById('user_id').value=data.user_id;
    document.getElementById('salary').value=data.salary;
    document.getElementById('position').value=data.position;
    document.getElementById('performance').value=data.performance;
    document.getElementById('joindate').value=data.joindate;

    openempmodal(data.user_id);
}

async function deletemodal(id) {
    const confirmed = confirm("Are you sure you want to delete this entry?");
    console.log(csrftoken);
    if (confirmed) {
        const response = await fetch(`/work2/${id}/`, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken
            },
        });
        if (response.ok) {
            fetchemployee();
        } else {
            alert("An error occurred while trying to delete the entry.");
        }
    }
}

function openempmodal(selectedUserId=null){
    document.getElementById('model').style.display='block';
    fetchusers(selectedUserId);
}

async function fetchusers(selectedUserId) {
    const response=await fetch('/user/');
    const users=await response.json();
    const userdropdown=document.getElementById('user_id');
    userdropdown.innerHTML='';

    users.forEach(user=>{
        const option=document.createElement('option');
        option.value=user.id;
        option.textContent=user.id + "," +user.name;
        userdropdown.appendChild(option);
    });

    if(selectedUserId){
        userdropdown.value=selectedUserId
    }
}

function clearForm() {
    document.getElementById('itemid').value = '';
    document.getElementById('user_id').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('position').value = '';
    document.getElementById('performance').value = '';
    document.getElementById('joindate').value = '';
}
*/