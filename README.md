### 🗒️ Notes Management App — 10Pshine

A **full-stack MERN application** for creating, organizing, and managing personal or collaborative notes efficiently. This app allows users to securely sign up, log in, create, edit, and delete notes, with features for password management and user authentication.

#### 🚀 Features

* **User Authentication:** Secure login, signup, forgot-password, and reset-password functionality using JWT and bcrypt.
* **Notes CRUD:** Create, read, update, and delete notes with an intuitive UI.
* **Error Handling:** Robust backend and frontend error handling for a smooth user experience.
* **Testing:** Implemented **Mocha/Chai** for backend testing and **Jest** for frontend testing.
* **SonarQube Integration:** Code quality and maintainability checks integrated into CI/CD workflow.
* **Modular Architecture:** Separated **frontend** (React) and **backend** (Node.js/Express) for scalability.

#### 🛠️ Tech Stack

* **Frontend:** React.js, Jest, Axios
* **Backend:** Node.js, Express.js, Mocha, Chai
* **Database:** MongoDB Atlas
* **API Testing:** Postman
* **Authentication:** JSON Web Tokens (JWT), bcrypt
* **Code Quality:** SonarQube

#### 📂 Project Structure

```
├── backend/        # Server-side code (API, routes, models, tests)
├── frontend/       # Client-side React app (UI components, tests)
├── .scannerwork/   # SonarQube configuration
├── package.json    # Dependencies
└── README.md       # Project documentation
```

#### ⚙️ How to Run

1. Clone the repository

   ```bash
   git clone https://github.com/Yumna0019/YumnaMubeen-mern-10pshine.git
   cd YumnaMubeen-mern-10pshine
   ```
2. Install dependencies for both frontend and backend

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up your `.env` file with MongoDB URI and JWT secret.
4. Start the app

   ```bash
   npm run dev
   ```

---

Would you like me to make it sound **more concise for a GitHub README**, or keep it as a **detailed professional description** (like for a portfolio)?
