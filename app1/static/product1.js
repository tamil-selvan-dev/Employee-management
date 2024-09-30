document.addEventListener('DOMContentLoaded',async () =>{

    const productcontainer=document.querySelector('.product-container');
    const modal=document.getElementById('model');
    const closemodal = document.getElementById('close-modal');

    const response=await fetch('/work/');
    const products=await response.json();

    products.forEach(product => {
        const productdiv=document.createElement('div');
        productdiv.classList.add('container1');
        
        productdiv.innerHTML=`
            <p>${product.id}</p>
            <p class="par"><strong class="st">${product.product}</strong></p>
            <p class="par"><strong>Superior:</strong>${product.superior}</p>
            <p class="par"><strong>Status:</strong>${product.status}</p>
            <button class="view-button" data-product='${JSON.stringify(product)}'>view</button>
        `;
        productcontainer.appendChild(productdiv);
    });
    document.querySelectorAll('.view-button').forEach(button =>{
        button.addEventListener('click', (e) => {
            const product=JSON.parse(e.target.getAttribute('data-product'));
            const startDate=new Date(product.startdate).toLocaleDateString();
            const endDate=new Date(product.enddate).toLocaleDateString();
            document.getElementById('modal-product-name').innerHTML=product.product;
            document.getElementById('modal-product-details').innerHTML=`
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Cost:</strong> ₹${product.cost}</p>
                <p><strong>Revenue:</strong> ₹${product.revenue}</p>
                <p><strong>Start Date:</strong> ${startDate}</p>
                <p><strong>End Date:</strong> ${endDate}</p>
                <p><strong>Superior:</strong>${product.superior}</p>
                <p><strong>Status:</strong>${product.status}</p>
                <h3>Employees:</h3>
                <div class="employee-list">
                    ${product.employees.map(emp => `
                        <div class="employee-list1">
                        <img src="https://th.bing.com/th/id/OIP.39Zx7r6-ia_7-3LtsXdB1QAAAA?w=140&h=150&c=7&r=0&o=5&pid=1.7"></img><br><p><strong>${emp.name}</strong>(${emp.position})</p>
                        </div>
                    `).join('')}
                </div>
            `;
            modal.style.display='block';
        });
    });
    closemodal.onclick=function(){
        modal.style.display='none';
    }

    window.onclick=function(event){
        if(event.target === modal){
            modal.style.display='none';
        }
    }

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