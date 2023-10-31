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

### Setup and Local Development

1. Clone the repository:

```
    https://github.com/nikhilbuts/node-books-crud-app.git
```

2. Install dependencies:

```
    cd node-books-crud-app
    npm install
```

3. Set up MongoDB:
- Create a MongoDB database and configure the connection URI in .env file.
- You can use a cloud solution like MongoDB Atlas or set up a local MongoDB instance.

4. Set environment variables:
- Create a .env file in the root directory and set the following environment variables:

```
    PORT=3000
    MONGODB_URI=your_mongodb_uri_here
    JWT_SECRET=your_jwt_secret_here
```

5. Start the server:
```
    npm start || node app.js
```

6. Please access the API at http://localhost:3000.


### Decisions and Assumptions

- I assumed a basic authentication mechanism using JSON Web Tokens (JWT) for user registration and login. You can extend this for more advanced user management.
- The API includes pagination and search functionality for listing books.
- I used Express.js for building the API and Mongoose for interacting with the MongoDB database.

