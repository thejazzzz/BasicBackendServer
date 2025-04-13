# BasicBackendServer

## Overview
`BasicBackendServer` is a Node.js-based backend server designed to handle user authentication, subscription management, and user data. It leverages modern JavaScript features and incorporates essential tools and libraries for secure, efficient, and scalable backend development.

## Features
- **Authentication**: User signup, login, and JSON Web Token (JWT)-based authentication.
- **Subscription Management**: Handles subscription-related operations.
- **Database**: MongoDB integration using Mongoose for data modeling and interaction.
- **Middleware Support**: Custom and third-party middleware for enhanced functionality.
- **Security**: Implements secure password hashing with `bcryptjs` and bot detection using `@arcjet/node`.

## Project Structure
The project is organized as follows:
```
BasicBackendServer/
├── app.js                     # Main application entry point
├── config/                    # Configuration files
│   ├── arcjet.js              # Arcjet middleware setup
│   ├── env.js                 # Environment variable configuration
├── controllers/               # Contains controller logic
│   ├── auth.controller.js     # Authentication-related logic
│   ├── user.controller.js     # User-related logic
├── database/                  # Database connection and setup
├── middleware/                # Custom middleware
├── models/                    # Mongoose models
├── routes/                    # API routes
├── .gitignore                 # Files and directories to ignore in git
└── package.json               # Project metadata and dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB (Running instance)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/thejazzzz/BasicBackendServer.git
   cd BasicBackendServer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory. Example:
   ```
   PORT=3000
   NODE_ENV=development
   DB_URI=mongodb://localhost:27017/basic-backend-server
   JWT_SECRET=your_secret_key
   JWT_EXPIRY=1d
   ARCJET_KEY=your_arcjet_key
   ```

### Running the Server
- Start the server in production mode:
  ```bash
  npm start
  ```
- Start the server in development mode:
  ```bash
  npm run dev
  ```

## API Endpoints
The server provides the following API endpoints:

### Authentication
- **POST** `/api/v1/auth/signup`: Register a new user.
- **POST** `/api/v1/auth/signin`: Log in with email and password.

### Users
- **GET** `/api/v1/users`: Fetch all users.
- **GET** `/api/v1/users/:id`: Fetch a specific user by ID.

### Subscription
- **(Define subscription-related routes in `routes/subcription.routes.js`)**

## Key Files and Functionality

### `app.js`
- Initializes the Express app.
- Configures middleware like `cookie-parser` and `arcjetMiddleware`.
- Sets up API routes and error handling.
- Starts the server and connects to MongoDB.

### `config/arcjet.js`
- Implements bot detection, SQL injection protection, and rate-limiting using Arcjet.

### `config/env.js`
- Loads environment variables using `dotenv`.

### `controllers/auth.controller.js`
- Handles user signup and login functionality.
- Implements secure password hashing with `bcryptjs` and JWT token generation.

### `controllers/user.controller.js`
- Provides functionality to fetch all users or a specific user by ID.

## Middleware
- **`error.middleware.js`**: Handles application-wide error logging and responses.
- **`arcjet.middleware.js`**: Applies Arcjet functionality for bot detection and protection.

## Dependencies
### Main Dependencies
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `jsonwebtoken`: Token-based authentication.
- `bcryptjs`: Password hashing.
- `dotenv`: Environment variable management.
- `@arcjet/node`: Bot protection and rate limiting.

### Development Dependencies
- `nodemon`: Automatically restarts the server during development.
- `eslint`: JavaScript linting utility.

## .gitignore
The `.gitignore` file ensures sensitive and unnecessary files are not tracked in version control. For example:
- `node_modules/`
- `.env`
- `logs/`
- `dist/`

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful commit message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

### MIT License

```
MIT License

Copyright (c) 2025 thejazzzz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
