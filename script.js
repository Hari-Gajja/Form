 function updateDetails() {
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const currency = document.getElementById('currency').value;
            const amount = document.getElementById('amount').value;
            const forWhat = document.getElementById('for').value;
            const issuedBy = document.getElementById('issuedBy').value;
            const methodOfPayment = document.getElementById('methodOfPayment').value;

            const details = `Dear Customer.We have received the amount of ${currency} ${amount} for ${forWhat} on ${date} ${time} in ${methodOfPayment} from ${from} . Received by ${issuedBy}`;
            document.getElementById('details').value = details;
        }

        function setCurrentDateTime() {
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].slice(0, 5);

            document.getElementById('date').value = date;
            document.getElementById('time').value = time;

            updateDetails();
        }


function shareAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(12); // Adjust font size
    doc.text('CASH RECEIPT', 10, 10);

    const receiptDetails = document.querySelectorAll('.receipt div');
    let yOffset = 20;
    const lineHeight = 10; // Define line height for text

    receiptDetails.forEach(detail => {
        const label = detail.querySelector('label').textContent;
        const value = detail.querySelector('input, textarea').value;
        const text = `${label}: ${value}`;

        // Check if the text is too long for one line and add line breaks if necessary
        const maxLineWidth = 150; // Adjust based on your page size
        const lines = doc.splitTextToSize(text, maxLineWidth);

        lines.forEach(line => {
            doc.text(line, 10, yOffset);
            yOffset += lineHeight;
        });
    });

    const to = document.getElementById('to').value; // Getting the value of 'to' input field
    doc.save(`${to}.pdf`); // Saving the PDF based on the 'to' value

    if (navigator.share) {
        navigator.share({
            title: `${to}`,
            text: 'Here is my cash receipt.',
            files: [new File([doc.output('blob')], `${to}.pdf`, { type: 'application/pdf' })]
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.log('Sharing failed', error));
    } else {
        alert('Web Share API not supported in this browser.');
    }
}



       function shareOnWhatsApp() {
            const details = document.getElementById('details').value;
            const url = `https://wa.me/?text=${encodeURIComponent(details)}`;
            window.open(url, '_blank');
        }
        document.addEventListener('DOMContentLoaded', setCurrentDateTime);
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateDetails);
        });