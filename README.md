# Chat App

## Installation

1. **Clone the repository and open the project root location in a code editor:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    cd socket
    npm install
    cd ..
    ```

3. **Set up environment variables:**
    - Create two `.env` files: one in the root directory and one in the `client` directory.

    **Root directory `.env` file:**
    ```plaintext
    MONGO=<MongoDB URL>
    JWT_SECRET=<Your JWT Secret>
    ```

    **Client directory `.env` file (for sign in with Google):**
    ```plaintext
    VITE_FIREBASE_API_KEY=<Your Firebase API Key>
    ```

4. **Additional Configuration:**
    - If your frontend runs on a port other than `5173`, update the `socket/index.js` file, line 3:
    ```javascript
    origin: "http://localhost:<Your PORT>"
    ```

    - Ensure ports `3000` (backend API) and `8080` (socket.io) are available.

5. **Running the Application:**
    - Navigate to the root directory and start the backend server:
    ```bash
    npm run dev
    ```

    - Navigate to the `client` directory and start the frontend:
    ```bash
    cd client
    npm run dev
    ```

    - Navigate to the `socket` directory and start the socket server:
    ```bash
    cd ../socket
    npm start
    ```

6. **Using the Application:**
    - You can sign up from different accounts and log in to use the chat app.

## Brief Explanation of the Application’s Structure
The Chat App is structured as a MERN stack application:
- **Frontend:** Built with React, located in the `client` directory. It handles the user interface and communicates with the backend via API calls.
- **Backend:** Developed with Express and Node.js, located in the `api` directory. It manages authentication, API endpoints, and business logic.
- **Database:** Uses MongoDB for data storage, accessed via Mongoose. The connection string and JWT secret are stored in environment variables.
- **Socket Server:** Uses Socket.io for real-time communication, located in the `socket` directory.

## Any Assumptions Made
- Users have Node.js and npm installed on their machines.
- Users know how to setup MongoDB database and obtain the connection string.

## Limitations
- The application is designed for development purposes and may not be optimized for production.
- Performance may degrade with a large number of concurrent users.
- It might only work on certain browsers.

Enjoy the application!