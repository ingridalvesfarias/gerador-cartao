const nameInput = document.getElementById('nameInput');
const roleInput = document.getElementById('roleInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const colorPicker = document.getElementById('colorPicker');
const bgPicker = document.getElementById('bgPicker');


const previewName = document.getElementById('previewName');
const previewRole = document.getElementById('previewRole');
const previewEmail = document.getElementById('previewEmail');
const previewPhone = document.getElementById('previewPhone');
const cardSeparator = document.querySelector('.card-separator');
const businessCard = document.getElementById('businessCard');
const downloadBtn = document.getElementById('downloadBtn');

/**
 * @param {HTMLElement} input 
 * @param {HTMLElement} preview 
 * @param {string} fallback 
 */
function setupLiveUpdate(input, preview, fallback) {
    input.addEventListener('input', () => {
        preview.textContent = input.value.trim() || fallback;
    });
}

setupLiveUpdate(nameInput, previewName, "Seu Nome Aqui");
setupLiveUpdate(roleInput, previewRole, "Seu Cargo ou Título");
setupLiveUpdate(emailInput, previewEmail, "📧 contato@seu-email.com");
setupLiveUpdate(phoneInput, previewPhone, "📞 (00) 00000-0000");

colorPicker.addEventListener('input', () => {
    const newColor = colorPicker.value;
    previewName.style.color = newColor;
    cardSeparator.style.backgroundColor = newColor;
});

bgPicker.addEventListener('input', () => {
    businessCard.style.backgroundColor = bgPicker.value;
});


downloadBtn.addEventListener('click', () => {

    const cardHTML = businessCard.outerHTML;
    
    // Cria uma janela temporária para impressão
    const printWindow = window.open('', '_blank', 'width=900,height=600');
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Imprimir Cartão - ${nameInput.value || 'Digital Card'}</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                body { 
                    margin: 0; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    background-color: white;
                }
                .business-card {
                    width: 450px;
                    height: 250px;
                    background-color: ${bgPicker.value};
                    border-radius: 12px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    font-family: 'Poppins', sans-serif;
                    box-sizing: border-box;
                    -webkit-print-color-adjust: exact
                }
                .card-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem;
                    color: ${colorPicker.value};
                    margin: 0 0 5px 0;
                }
                .card-role {
                    font-size: 0.9rem;
                    color: #eee;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin: 0;
                }
                .card-separator {
                    width: 50px;
                    height: 2px;
                    background-color: ${colorPicker.value};
                    margin: 15px 0;
                }
                .card-contact-info p {
                    font-size: 0.8rem;
                    color: #aaa;
                    margin: 2px 0;
                }
            </style>
        </head>
        <body>
            ${cardHTML}
            <script>
                setTimeout(() => {
                    window.print();
                    window.close();
                }, 500);
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
});