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

    **Client directory `.env` file:**
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

Enjoy the application!
