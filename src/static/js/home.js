const usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    alert('Você precisa fazer login primeiro!');
    window.location.href = 'index.html';
}

const closeBtns = document.querySelectorAll('.close');
const add_modal = document.getElementById('addBookModal');
const edit_modal = document.getElementById('editBookModal')

function openBookModal(modal){
    modal.style.display = 'block';
}

function closeBookModal(modal){
    modal.style.display = 'none';
}

closeBtns.forEach(btn => {
    btn.onclick = function() {
        const modal = btn.closest('.modal');
        if (modal) {
            closeBookModal(modal);
        }
    };
});

async function handleAddBook(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
        categories: document.getElementById('categories').value.split(',').map(cat => cat.trim()),
        year: parseInt(document.getElementById('year').value) || new Date().getFullYear(),
        location: document.getElementById('location').value
    };
    console.log('Adding book with data:', formData);

    adicionarLivros(formData);
    document.getElementById("addBookForm").reset();
    closeBookModal(add_modal);
}

function filterBooks(query) {
    query = query.toLowerCase();
    const rows = document.querySelectorAll('#booksTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

function editBook() {
    const row = event.target.closest('tr');
    
    if (row) {
        const cells = row.cells;
        const title = cells[0].textContent;
        const author = cells[1].textContent;
        const isbn = cells[2].textContent;
        const categories = cells[3].textContent;
        const year = cells[4].textContent;
        const location = cells[6].textContent;
        
        document.getElementById('edit-title').value = title;
        document.getElementById('edit-author').value = author;
        document.getElementById('edit-isbn').value = isbn;
        document.getElementById('edit-categories').value = categories;
        document.getElementById('edit-year').value = year;
        document.getElementById('edit-location').value = location;
        
        edit_modal.dataset.editingRow = row.rowIndex;
        
        openBookModal(edit_modal);
    }
}

async function handleEditBook(event) {
    event.preventDefault();
    
    const rowIndex = edit_modal.dataset.editingRow;
    const row = document.querySelector(`#booksTableBody tr:nth-child(${rowIndex})`);
    
    if (row) {
        const formData = {
            title: document.getElementById('edit-title').value,
            author: document.getElementById('edit-author').value,
            isbn: document.getElementById('edit-isbn').value,
            categories: document.getElementById('edit-categories').value,
            year: document.getElementById('edit-year').value,
            location: document.getElementById('edit-location').value
        };
        
        row.cells[0].textContent = formData.title;
        row.cells[1].textContent = formData.author;
        row.cells[2].textContent = formData.isbn;
        row.cells[3].textContent = formData.categories;
        row.cells[4].textContent = formData.year;
        row.cells[6].textContent = formData.location;
        
        console.log('Livro editado:', formData);
        
        closeBookModal(edit_modal);
        
        document.getElementById('editBookForm').reset();
    }
}

function deleteBook() {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
        const row = event.target.closest('tr');
        
        if (row) {
            row.style.transition = 'opacity 0.3s';
            row.style.opacity = '0';
            
            setTimeout(() => {
                row.remove();
                console.log('Livro deletado');
            }, 300);
        }
    }
}

function logout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function adicionarLivros(formData)
{
    const actionColumn = usuarioLogado.role === 'Funcionario' ? `
        <td class="actions">
            <button class="btn-icon" onclick="editBook()">
                <i class="fas fa-pen"></i>
            </button>
            <button class="btn-icon" onclick="deleteBook()">
                <i class="fas fa-trash"></i>
            </button>
            <button class="btn-icon" onclick="borrowBook()">
                <i class="fas fa-book-reader"></i>
            </button>
        </td>` : '';
    
    document.getElementById('booksTableBody').innerHTML += `
                    <tr>
                        <td>${formData.title}</td>
                        <td>${formData.author}</td>
                        <td>${formData.isbn}</td>
                        <td>${formData.categories.join(", ")}</td>
                        <td>${formData.year}</td>
                        <td>
                            <span class="status-badge status-disponivel">
                                Disponível
                            </span>
                        </td>
                        <td>${formData.location}</td>
                        ${actionColumn}
                    </tr>`;
}

const livros = [
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        isbn: "9788544001080",
        categories: ["Romance", "Literatura Brasileira"],
        year: 1899,
        location: "Estante A, Prateleira 1"
    },
    {
        title: "O Cortiço",
        author: "Aluísio Azevedo",
        isbn: "9788508040414",
        categories: ["Romance", "Naturalismo"],
        year: 1890,
        location: "Estante A, Prateleira 2"
    },
    {
        title: "Grande Sertão: Veredas",
        author: "Guimarães Rosa",
        isbn: "9788535908770",
        categories: ["Romance", "Literatura Brasileira"],
        year: 1956,
        location: "Estante B, Prateleira 1"
    },
    {
        title: "Capitães da Areia",
        author: "Jorge Amado",
        isbn: "9788535914063",
        categories: ["Romance", "Drama"],
        year: 1937,
        location: "Estante B, Prateleira 3"
    },
    {
        title: "Memórias Póstumas de Brás Cubas",
        author: "Machado de Assis",
        isbn: "9788544001073",
        categories: ["Romance", "Realismo"],
        year: 1881,
        location: "Estante A, Prateleira 1"
    }
];

livros.forEach(livro => {
    adicionarLivros(livro);
});

if(usuarioLogado.role !== 'Funcionario') {
    document.getElementById('addBookBtn').style.display = 'none';
    const actionHeader = document.querySelector('th.actions');
    if (actionHeader) {
        actionHeader.style.display = 'none';
    }
    const subtitle = document.querySelector('.logo p');
    subtitle.textContent = `Bem-vindo(a), ${usuarioLogado.nome}`;
}

function borrowBook() {
    const row = event.target.closest('tr');
    
    if (row) {
        const statusCell = row.cells[5];
        const statusBadge = statusCell.querySelector('.status-badge');
        
        if (statusBadge.classList.contains('status-disponivel')
            && confirm('Confirmar empréstimo do livro?')) {
            statusBadge.classList.remove('status-disponivel');
            statusBadge.classList.add('status-emprestado');
            statusBadge.textContent = 'Emprestado';
        } else {
            alert('Este livro já está emprestado.');
        }
    }
}