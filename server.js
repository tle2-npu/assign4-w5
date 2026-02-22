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

/* Create your REST API here with the following endpoints:*/

// GET /api/books: Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id: Get a specific book
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
});

// POST /api/books: Add a new book
app.post('/api/books', (req, res) => {

    // Extract data from request body
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const copiesAvailable = req.body.copiesAvailable;

    // Create new book with generated ID
    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        genre: genre,
        copiesAvailable: copiesAvailable
    };

    // Add to books array 
    books.push(newBook);

    // Return the created book with 201 status 
    res.status(201).json(newBook);
});

// PUT /api/books/:id: Update a book
app.put('/api/books/:id', (req, res) => {

    const bookId = parseInt(req.params.id);

    // Find the book to update 
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    // Update the book 
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.copiesAvailable = req.body.copiesAvailable;

    // Return the updated book 
    res.json(book);
});

// DELETE /api/books/:id: Delete a book
app.delete('/api/books/:id', (req, res) => {

    const bookId = parseInt(req.params.id);

    // Find the book index
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    // Remove the book from array 
    const deletedBook = books.splice(index, 1)[0];

    // Return the deleted book 
    res.json({
        message: "Book deleted successfully",
        book: deletedBook
    });
});

// Only start server when running directly, , not when testing
if (require.maim === module) {
    app.listen(port, () => {
        console.log(`Books API server running at http://localhost:${port}`); 
    });
}

module.exports = app;