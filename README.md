# Book Review App

A simple RESTful API for managing books, users, and reviews.

## Project Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sarthaks225/book-review-app.git
   cd book-review-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/bookReviewDB
   JWT_SECRET=your_jwt_secret
   ```

4. **Start MongoDB:**  
   Ensure MongoDB is running locally on your machine.

## How to Run Locally

- **Development mode (with nodemon):**

  ```sh
  npm run dev
  ```

- **Production mode:**
  ```sh
  npm start
  ```

The server will start on the port specified in `.env` (default: 3000).

## Example API Requests

### Signup

```sh
curl --location 'http://localhost:3000/signup/signup' \
--header 'Content-Type: application/json' \
--data '{
    "password": "password",
    "username": "username"
}'
```

### Login

```sh
curl --location 'http://localhost:3000/login/login' \
--header 'Content-Type: application/json' \
--data '{
    "password": "password",
    "username": "username"
}'
```

_Response:_

```json
{ "token": "<JWT_TOKEN>" }
```

### Add a Book (Authenticated)

```sh
curl --location 'http://localhost:3000/books' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  <JWT_TOKEN>' \
--data '{
  "title": "book title",
  "author": "author name",
  "genre": "genre"
}'
```

### Get Books

```sh
curl --location 'http://localhost:3000/books'
```

```sh
curl --location 'http://localhost:3000/books?genre=sci&page=2&limit=5'
```

### Add a Review to a Book (Authenticated)

```sh
curl --location 'http://localhost:3000/books/6838ae6ae40cff7f634b40d4/reviews' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer  <JWT_TOKEN>' \
--data '{
  "rating": 5,
  "comment": "Must go for it..."
}'
```

### Update a Review (Authenticated)

```sh
curl --location --request PUT 'http://localhost:3000/reviews/6838b4b79f4ba9d3f6b6748e' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <JWT_TOKEN>' \
--data '{
    "rating": 1,
    "comment": "The plot was predictable and characters felt flat."
}'
```

### Delete a Review (Authenticated)

```sh
curl --location --request DELETE 'http://localhost:3000/reviews/6838b4b79f4ba9d3f6b6748e' \
--header 'Authorization: Bearer  <JWT_TOKEN>' \
--header 'Content-Type: text/plain' \
--data-binary '@'
```

## Design Decisions & Assumptions

- **Authentication:** JWT-based authentication is used. All endpoints that modify data require a valid token.
- **Password Security:** Passwords are hashed using bcrypt before storage.
- **Book & Review Relationship:** Each review is linked to a user and a book. Users can only review a book once.
- **Pagination:** Book listing and book reviews support pagination via `page` and `limit` query parameters.
- **Error Handling:** Basic error messages are returned for invalid requests or authentication failures.
- **Environment Variables:** Sensitive data (DB URI, JWT secret) will be stored in `.env`.

---

## Postman Collection

A Postman collection (`book-review-app.postman_collection.json`) is included in this repository for easy API testing.

**How to use:**

1. Open [Postman](https://www.postman.com/).
2. Click `Import` and select the `book-review-app.postman_collection.json` file from the project root.
3. Use the requests provided to test the API endpoints.
   - Update variables like `<JWT_TOKEN>` as needed after logging in.
   - Note: Some endpoints in the collection use `/signup/signup` and `/login/login` as per the current API routes. If you update your API routes to standard RESTful paths, also update the Postman collection accordingly.

---

## Entity Relationship Diagram (ER Diagram)

Below is the ER diagram for the Book Review API:

![ER Diagram](https://raw.githubusercontent.com/sarthaks225/book-review-app/main/ER-diagram.png)

**Entities:**

- **User**
- **Book**
- **Review**

**Relationships:**

- A User can add multiple Books (1-to-many)
- A User can write multiple Reviews (1-to-many)
- A Book can have multiple Reviews (1-to-many)
- A Review belongs to exactly one User and one Book

**Table Definitions:**

```
Table User {
  _id ObjectId [pk]
  username string [unique, not null]
  password string [not null]
}

Table Book {
  _id ObjectId [pk]
  title string [not null]
  author string
  genre string
  created_at datetime
  updated_at datetime
}

Table Review {
  _id ObjectId [pk]
  user ObjectId [ref: > User._id, not null]
  book ObjectId [ref: > Book._id, not null]
  rating int [not null]
  comment string
  created_at datetime
  updated_at datetime
}
```

---
