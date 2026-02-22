const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Books API', () => {

    // GET ALL BOOKS
    test('GET /api/books should return all books', async () => {
        const response = await request(app).get('/api/books');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // GET BOOK BY ID (SUCCESS)
    test('GET /api/books/:id should return a specific book', async () => {
        const response = await request(app).get('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('author');
    });

    // GET BOOK BY ID (NOT FOUND)
    test('GET /api/books/:id should return 404 if book not found', async () => {
        const response = await request(app).get('/api/books/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    // CREATE BOOK
    test('POST /api/books should create a new book', async () => {
        const newBook = {
            title: "Dune",
            author: "Frank Herbert",
            genre: "Sci-Fi",
            copiesAvailable: 4
        };

        const response = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe("Dune");
        expect(response.body.author).toBe("Frank Herbert");
    });

    // UPDATE BOOK (SUCCESS)
    test('PUT /api/books/:id should update a book', async () => {
        const updatedBook = {
            title: "Updated Title",
            author: "Updated Author",
            genre: "Updated Genre",
            copiesAvailable: 10
        };

        const response = await request(app)
            .put('/api/books/1')
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Updated Title");
        expect(response.body.copiesAvailable).toBe(10);
    });

    // UPDATE BOOK (NOT FOUND)
    test('PUT /api/books/:id should return 404 if book not found', async () => {
        const response = await request(app)
            .put('/api/books/999')
            .send({
                title: "Test",
                author: "Test",
                genre: "Test",
                copiesAvailable: 1
            });

        expect(response.status).toBe(404);
    });

    // DELETE BOOK (SUCCESS)
    test('DELETE /api/books/:id should delete a book', async () => {
        const response = await request(app)
            .delete('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    // DELETE BOOK (NOT FOUND)
    test('DELETE /api/books/:id should return 404 if book not found', async () => {
        const response = await request(app)
            .delete('/api/books/999');

        expect(response.status).toBe(404);
    });

});