async function fetchrevenue() {
    try{
        const response=await fetch('/product/revenue_summary');
        const data=await response.json();

        document.getElementById('total-cost').innerText="₹"+data.total_cost;
        document.getElementById('total-revenue').innerText="₹"+data.total_revenue;
        document.getElementById('profit-percentage').innerText=data.profit_percentage+"%";
    } catch (error) {
        console.error('Error fetching revenue summary:',error);
    }
}
fetchrevenue();

async function fetchproducts() {
    try{
        const response=await fetch('/product/');
        const products=await response.json();

        const productstatusdiv=document.getElementById('product-status');
        productstatusdiv.innerHTML='';

        const headers = `
                <div class="headers">
                    <strong>Name</strong>
                    <strong class="pro1">Superior</strong>
                    <strong class="pro2">Status</strong>
                </div>
            `;
        productstatusdiv.innerHTML += headers;

        products.forEach(product=>{
            const productinfo=document.createElement('div');
            productinfo.className='product-info';

            let statusClass = '';
            switch (product.status.toLowerCase()) {
                case 'ongoing':
                    statusClass = 'status-ongoing';
                    break;
                case 'upcoming':
                    statusClass = 'status-upcoming';
                    break;
                case 'completed':
                    statusClass = 'status-completed';
                    break;
                default:
                    statusClass = '';
            }

            productinfo.innerHTML=`
                <p class="pro">${product.product}</p>
                <p>${product.superior}</p>
                <p class="pro1 ${statusClass}">${product.status}<i class="material-icons per">arrow_upward</i></p>
            `;
            productstatusdiv.appendChild(productinfo);
        });
    } catch (error) {
        console.error('Error in fetching product data',error);
    }
}
fetchproducts();

async function fetchemplyoee(params) {
    try{
        const response=await fetch('/details/empdate/');
        const data=await response.json();

        const labels=data.map(entry => `${entry.year}-${entry.month}`);
        const counts=data.map(entry=>entry.count);

        const ctx=document.getElementById('employeechart').getContext('2d');
        const employeechart=new Chart(ctx,{
            type:'line',
            data:{
                labels:labels,
                datasets:[{
                    label:'Employee count',
                    data:counts,
                    bordercolor:'rgba(75, 192, 192, 1)',
                    backgroundcolor:'rgba(75, 192, 192, 0.2)',
                    fill:true,
                    tension:0.1
                }]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:true,
                        title:{
                            display:true,
                            text:'Count',
                        }
                    },
                    x:{
                        title:{
                            display:true,
                            text:'Year-Month(2023-2024)'
                        }
                    }
                }
            } 
        });
    } catch (error) {
        console.error('Error fetching employee data',error);
    }
}
fetchemplyoee();

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