const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = '';
    
    if (myLibrary.length === 0) {
        container.innerHTML = '<div class="empty-library">No books yet</div>';
        return;
    }
    
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;
        
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>Status: ${book.read ? 'Read' : 'Unread'}</p>
            <div class="book-actions">
                <button class="btn toggle-btn" data-id="${book.id}">
                    ${book.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="btn btn-danger remove-btn" data-id="${book.id}">
                    Remove
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    attachBookEvents();
}

function attachBookEvents() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary.splice(index, 1);
            displayBooks();
        };
    });
    
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.dataset.id;
            const book = myLibrary.find(book => book.id === id);
            if (book) {
                book.toggleRead();
                displayBooks();
            }
        };
    });
}

document.getElementById('new-book-btn').onclick = function() {
    document.getElementById('book-form-modal').showModal();
};

document.getElementById('close-modal').onclick = function() {
    document.getElementById('book-form-modal').close();
};

document.getElementById('book-form').onsubmit = function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read-status').value === 'true';
    
    addBook(title, author, pages, read);
    
    this.reset();
    document.getElementById('book-form-modal').close();
};

addBook('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBook('1984', 'George Orwell', 328, false);
displayBooks();