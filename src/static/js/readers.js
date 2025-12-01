function logout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function filterReaders(query) {
    query = query.toLowerCase();
    const rows = document.querySelectorAll('#readersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

function addReaderRow(reader)
{
    const tableBody = document.querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>${reader.nome}</td>
            <td>${reader.cpf}</td>
            <td>${reader.email}</td>
            <td>${reader.matricula}</td>
        </tr>
    `;

    tableBody.appendChild(row);
}

const usuarios = [{
        nome: "Alexandre",
        cpf:"12345678909",
        email: "alexandre@gmail.com",
        matricula: "202365001",
        password: "1234",
        role: "Funcionario"
    },{
        nome: "Ana",
        cpf:"76841799003",
        email: "ana@gmail.com",
        matricula: "202365002",
        password: "1234",
        role: "Professor"  
    },{
        nome: "Carlos",
        cpf:"77183381005",
        email: "carlos@gmail.com",
        matricula: "202365003",
        password: "1234",
        role: "Aluno"
    }
];

for (const usuario of usuarios) {
    addReaderRow(usuario);
}