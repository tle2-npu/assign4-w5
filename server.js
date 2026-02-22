const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON 
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

/* Create your REST API here with the following endpoints:
    'POST /api/books': 'Add a new book',
    'PUT /api/books/:id': 'Update a book',
    'DELETE /api/books/:id': 'Delete a book'
*/

// GET /api/books': Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id': Get a specific book
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
});

// Start server 
app.listen(port, () => {
    console.log(`Books API server running at http://localhost:${port}`);
});