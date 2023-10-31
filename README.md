# node-books-crud-app
# Node.js Book Management API

This is a Node.js RESTful API for managing books. It provides CRUD operations for books and utilizes MongoDB as the database.

## API Endpoints

### List Books

- **Endpoint:** `GET /books`
- **Description:** Get a list of all books.
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default is 1).
  - `limit` (optional): Number of books per page (default is 10).
  - `q` (optional): Search query to filter books by title, author, or summary.

### Create Book

- **Endpoint:** `POST /books`
- **Description:** Create a new book.
- **Request Body:** JSON object with `title`, `author`, and `summary` properties.
- **Example Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "summary": "Book Summary"
  }

### Get Book by ID
- **Endpoint:** `GET /books/:id`
- **Description:** Get details of a specific book by its ID.
- **URL Parameter:** id (required): The unique ID of the book.

### Update Book
- **Endpoint:** `PUT /books/:id`
- **Description:** Update a book's details by its ID.
- **URL Parameter:** id (required): The unique ID of the book.
- **Request Body:** JSON object with the fields to be updated.

### Delete Book
- **Endpoint:** `DELETE /books/:id`
- **Description:** Delete a book by its ID.
- **URL Parameter:** id (required): The unique ID of the book.

