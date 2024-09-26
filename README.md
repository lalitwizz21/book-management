# Book Management System

## Overview
The Book Management System is a full-stack application that allows users to manage a collection of books. Users can perform CRUD operations, including adding, updating, and deleting books, as well as uploading cover images.

## Technologies Used
- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **API**: RESTful API for book management

## Features
- View a list of books with pagination
- Add new books with cover image uploads
- Edit existing book details
- Delete books
- Search and filter books by title, author, and genre
- Responsive design for mobile and desktop views
- Toast notifications for user feedback

## Installation

### Prerequisites
- Node.js
- MongoDB (local or cloud)

### Client Setup
1. Navigate to the client directory:
```
cd client
```

2. Install dependencies:
  ```
npm install
```
3. Create a `.env` file and add your API URL:
```
REACT_APP_API_URL=http://localhost:4000
```
4. Start the client:
```
npm start
```

### Server Setup
1. Navigate to the server directory:
```
cd server
```

2. Install dependencies:
```
npm install
```

3. Start the MongoDB service (if using locally).

4. Create a .env file for server configuration.
```
MONGODB_URL=mongodb://localhost:27017/books
PORT=4000
```
6. Start the server:
```
npm start
```

## API Endpoints
- GET /books: Retrieve all books
- POST /books: Add a new book
- PUT /books/:id: Update an existing book
- DELETE /books/:id: Delete a book

## Usage
- After starting both the client and server, navigate to http://localhost:3000 to access the application.
- Use the "Add Book" button to create new entries.

## Contributing
Contributions are welcome! Please create a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.
