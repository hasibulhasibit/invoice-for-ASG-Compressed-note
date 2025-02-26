// script.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');

    if (orderId) {
        fetch(`generate_invoice.php?order_id=${orderId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    return;
                }

                // Update invoice details
                document.getElementById('invoice-date').textContent = data.date;
                document.getElementById('invoice-status').textContent = data.status;
                document.getElementById('client-name').textContent = data.client_name;
                document.getElementById('client-phone').textContent = data.phone;
                document.getElementById('client-email').textContent = data.email;
                document.getElementById('client-id').textContent = `Customer ID: ${data.id}`; // Assuming ID as customer ID
                document.getElementById('client-address').textContent = data.address;

                // Update product table
                const tableBody = document.getElementById('invoice-table-body');
                const row = `
                    <tr>
                        <td>${data.product_name}</td>
                        <td>${data.type}</td>
                        <td>${data.gateway}</td>
                        <td>${data.coupon}</td>
                        <td class="text-end">${data.amount}৳</td>
                    </tr>
                `;
                tableBody.innerHTML = row;
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Print function
    function printInvoice() {
        const printArea = document.getElementById('print-area');
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printArea.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;
    }
});