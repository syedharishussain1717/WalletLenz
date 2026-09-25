# 💰 WalletLenz – Personal Expense & Finance Management Platform

**WalletLenz** is a full-stack personal expense management application built using the **MERN stack (MongoDB, Express.js, React, and Node.js)**.

The application helps users manage their personal expenses, track spending, and analyze financial activity through an interactive dashboard.

The project is being developed incrementally, starting with a basic expense tracker and gradually expanding to include authentication, expense management, dashboard analytics, routing, and a responsive user interface.

> **📌 Current Status:** Core authentication, expense CRUD operations, dashboard analytics, routing, responsive UI, and expense editing are completed. Reports, filtering, UI improvements, and deployment are planned for future development.

---

## 📑 Table of Contents

* [Features](#-features)
* [Technologies Used](#️-technologies-used)
* [Project Structure](#-project-structure)
* [Application Architecture](#️-application-architecture)
* [Authentication Flow](#-authentication-flow)
* [API Endpoints](#-api-endpoints)
* [Project Status](#-project-status)
* [Future Work](#-future-work)
* [Development Roadmap](#-development-roadmap)
* [Learning Objectives](#-learning-objectives)

---

## 🚀 Features

### 1. Project Setup

The initial MERN project structure has been successfully created.

**Completed:**

* React + Vite frontend setup
* Express.js backend setup
* MongoDB Atlas connection
* Separate frontend and backend directories
* Git repository initialization
* GitHub repository setup
* Environment variable configuration
* Backend API testing

**Basic test endpoints:**

* `/api/test`
* `/api/protected`

---

### 2. 🔐 User Authentication

Authentication is implemented using **JWT (JSON Web Tokens)** and **bcrypt**.

#### Registration

* Users can register for an account.
* Passwords are hashed using bcrypt.
* Plain-text passwords are not stored in the database.

#### Login

* Users can log in using their registered credentials.
* The backend generates a JWT after successful authentication.
* The frontend stores the token in `localStorage`.

---

### 3. 🛡️ Protected Routes

Protected API routes require a valid JWT.

The authentication middleware verifies the token before allowing access to protected resources.

**Authentication process:**

1. The user logs in.
2. The backend generates a JWT.
3. The frontend stores the token in `localStorage`.
4. The frontend sends the token with protected API requests.
5. The authentication middleware verifies the token.
6. The authenticated user's information is attached to `req.user`.
7. The protected controller processes the request.

Invalid or expired tokens are rejected with an unauthorized response.

---

### 4. 💰 Expense Management (CRUD)

The core expense management functionality is implemented.

Users can:

* Create new expenses.
* View their expenses.
* Update existing expenses.
* Delete expenses.

Each expense is associated with the authenticated user.

The backend identifies the logged-in user using the user ID stored in the JWT:

```javascript
req.user.userId
```

This helps ensure that expenses are associated with the correct account.

---

### 5. 🔄 Expense API Integration

The application supports the following expense operations:

| Method   | Endpoint            | Description                  |
| -------- | ------------------- | ---------------------------- |
| `POST`   | `/api/expenses`     | Create a new expense         |
| `GET`    | `/api/expenses`     | Retrieve the user's expenses |
| `PUT`    | `/api/expenses/:id` | Update an existing expense   |
| `DELETE` | `/api/expenses/:id` | Delete an expense            |

All expense routes are protected using authentication middleware.

---

### 6. 🖥️ React Frontend

The React frontend is connected to the backend API.

The API URL is configured through:

```text
client/src/config.js
```

**Current frontend capabilities:**

* User login
* Fetching expenses from MongoDB
* Adding expenses
* Updating expenses
* Deleting expenses
* Displaying real database data

---

### 7. 🧭 React Routing

The application uses React Router to organize the interface into separate pages.

**Current routes:**

| Route          | Description                 |
| -------------- | --------------------------- |
| `/login`       | User login page             |
| `/dashboard`   | Expense analytics dashboard |
| `/add-expense` | Add or edit an expense      |
| `/expenses`    | View and manage expenses    |

A default route redirects users to the appropriate page.

**Application navigation flow:**

```text
Login
  |
  v
Dashboard
  |
  +----> Add Expense
  |
  +----> Expenses
             |
             v
            Edit
             |
             v
        Add Expense Page
```

---

### 8. ✏️ Edit Expense Functionality

The expense editing functionality is implemented across separate routes.

When a user clicks the **Edit** button:

1. The selected expense is loaded into the form state.
2. The application navigates to `/add-expense`.
3. The form is automatically populated with the existing expense data.
4. The user modifies the required fields.
5. The updated expense is submitted through the API.
6. MongoDB is updated with the new information.

**Edit workflow:**

```text
Expenses Page
      |
      v
  Edit Button
      |
      v
Load Existing Expense
      |
      v
Navigate to /add-expense
      |
      v
Form Filled Automatically
      |
      v
Update Expense
      |
      v
MongoDB Updated
```

---

### 9. 📊 Dashboard & Analytics

The dashboard uses actual expense data retrieved from MongoDB.

**Dashboard components:**

#### Total Expenses

Calculates the total amount of all recorded expenses.

#### Recent Transactions

Displays the user's recent expense transactions.

#### Category Summary

Groups expenses by category and calculates the total amount spent in each category.

#### Expense Overview

Displays a pie chart showing expense distribution across categories.

The chart is implemented using **Recharts** and uses actual expense data.

---

### 10. 🧭 Responsive Navigation Bar

The application includes a responsive navigation bar with the following options:

* Dashboard
* Add Expense
* Expenses
* Logout

**Mobile navigation features:**

* Hamburger menu for smaller screens
* Responsive navigation layout
* Automatic menu closing when a navigation link is selected

---

### 11. 📱 Responsive User Interface

Responsive CSS has been implemented throughout the application.

The interface is designed to work across:

* Mobile devices
* Tablets
* Desktop screens

Responsive styling has been applied to:

* Navigation bar
* Dashboard
* Login page
* Add Expense form
* Expense cards

The application has also been tested for mobile responsiveness.

---

### 12. 🧪 API Testing

Backend APIs have been tested using **Thunder Client**.

**Testing completed:**

* User registration
* User login
* JWT generation
* JWT authentication
* Protected routes
* Create expense
* Get expenses
* Update expense
* Delete expense
* Invalid JWT testing
* Expired JWT testing
* Unauthorized access testing

---

### 13. 🗄️ MongoDB Atlas Integration

**MongoDB Atlas** is used as the cloud database.

The application currently stores two main types of data.

#### Users

* User information
* Hashed passwords

#### Expenses

* Amount
* Category
* Description
* Date
* User reference

Each expense is associated with its authenticated user.

Mongoose is used to interact with MongoDB.

---

### 14. 🔀 Git & GitHub

Git and GitHub are used for version control and source code management.

**Git is used to:**

* Track project changes
* Create commits
* Maintain project history
* Push code to GitHub
* Keep a backup of the source code

---

## 🛠️ Technologies Used

### Frontend

| Technology   | Purpose                             |
| ------------ | ----------------------------------- |
| React        | User interface development          |
| Vite         | Frontend development and build tool |
| React Router | Client-side routing                 |
| Recharts     | Data visualization and charts       |
| JavaScript   | Application logic                   |
| CSS          | Styling and responsive design       |

### Backend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | Backend framework               |
| MongoDB    | NoSQL database                  |
| Mongoose   | MongoDB object modeling         |
| JWT        | Authentication                  |
| bcrypt     | Password hashing                |
| CORS       | Cross-origin resource sharing   |
| dotenv     | Environment variable management |

### Database

* MongoDB Atlas

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Thunder Client

---

## 📁 Project Structure

The project is organized into separate frontend and backend directories.

```text
WalletLenz/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   └── ExpenseCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── config.js
│   │   └── index.css
│   │
│   └── ...
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── server.js
│   ├── .env
│   └── ...
│
└── README.md
```

---

## 🏗️ Application Architecture

WalletLenz follows a client-server architecture using the MERN stack.

```text
                    WalletLenz
                        |
           +------------+------------+
           |                         |
           v                         v
      React Frontend            Express Backend
           |                         |
           v                         v
      React Router              API Routes
           |                         |
           |                  Authentication
           |                     Middleware
           |                         |
           |                         v
           |                    Controllers
           |                         |
           |                         v
           |                      Mongoose
           |                         |
           +------------+------------+
                        |
                        v
                  MongoDB Atlas
```

### Architecture Overview

* **React:** Handles the user interface and client-side interactions.
* **React Router:** Manages navigation between application pages.
* **Express.js:** Handles API requests and backend logic.
* **Authentication Middleware:** Verifies JWTs and identifies authenticated users.
* **Controllers:** Process authentication and expense-related operations.
* **Mongoose:** Manages communication with MongoDB.
* **MongoDB Atlas:** Stores user and expense data.

---

## 🔑 Authentication Flow

A typical authenticated expense request follows this process:

```text
User
  |
  v
React Frontend
  |
  v
JWT Stored in localStorage
  |
  v
Authorization Header
  |
  v
Express Route
  |
  v
authMiddleware
  |
  v
JWT Verification
  |
  v
req.user.userId
  |
  v
Expense Controller
  |
  v
MongoDB
  |
  v
API Response
  |
  v
React UI
```

The frontend sends the JWT using the following authorization header:

```http
Authorization: Bearer <token>
```

The backend verifies the token before allowing access to protected expense operations.

---

## 📡 API Endpoints

### Expense Routes

All expense endpoints require authentication.

| Method   | Endpoint            | Description       | Authentication |
| -------- | ------------------- | ----------------- | -------------- |
| `POST`   | `/api/expenses`     | Create an expense | Required       |
| `GET`    | `/api/expenses`     | Get expenses      | Required       |
| `PUT`    | `/api/expenses/:id` | Update an expense | Required       |
| `DELETE` | `/api/expenses/:id` | Delete an expense | Required       |

### Other Endpoints

| Endpoint         | Description                 |
| ---------------- | --------------------------- |
| `/api/test`      | Basic backend test endpoint |
| `/api/protected` | Protected test endpoint     |

> **Note:** Authentication endpoint paths are not listed here because their exact routes have not been specified.

---

## 📌 Project Status

The following table summarizes the current development progress.

| Feature                        | Status     |
| ------------------------------ | ---------- |
| React + Vite Setup             | ✅ Complete |
| Express Setup                  | ✅ Complete |
| MongoDB Atlas                  | ✅ Complete |
| Git & GitHub                   | ✅ Complete |
| User Registration              | ✅ Complete |
| User Login                     | ✅ Complete |
| Password Hashing               | ✅ Complete |
| JWT Authentication             | ✅ Complete |
| Protected Routes               | ✅ Complete |
| Create Expense                 | ✅ Complete |
| Get Expenses                   | ✅ Complete |
| Update Expense                 | ✅ Complete |
| Delete Expense                 | ✅ Complete |
| React API Integration          | ✅ Complete |
| Dashboard                      | ✅ Complete |
| Total Expenses                 | ✅ Complete |
| Recent Transactions            | ✅ Complete |
| Category Summary               | ✅ Complete |
| Expense Pie Chart              | ✅ Complete |
| React Routing                  | ✅ Complete |
| Separate Add Expense Page      | ✅ Complete |
| Separate Expenses Page         | ✅ Complete |
| Edit-to-Add Expense Navigation | ✅ Complete |
| Responsive Navbar              | ✅ Complete |
| Responsive Dashboard           | ✅ Complete |
| Responsive Forms & Cards       | ✅ Complete |
| Reports & Filtering            | ⏳ Pending  |
| Further UI Polish              | ⏳ Pending  |
| Deployment                     | ⏳ Pending  |

---

## 🚧 Future Work

WalletLenz is still under active development.

The following features are planned for future phases.

### 1. Reports & Filtering

* Filter expenses by category
* Filter expenses by date
* Date-range filtering
* Expense reports
* Additional financial statistics

### 2. UI Improvements

* Better form validation
* Loading states
* Improved error messages
* Better empty states
* Additional dashboard improvements
* Further responsive UI improvements

### 3. Deployment

Future deployment work will include:

* Frontend deployment
* Backend deployment
* Production environment variables
* Production MongoDB configuration
* Final API configuration
* Production testing

---

## 📈 Development Roadmap

WalletLenz is being developed incrementally through the following phases:

| Phase   | Description         | Status     |
| ------- | ------------------- | ---------- |
| Phase 1 | Project Setup       | ✅ Complete |
| Phase 2 | Authentication      | ✅ Complete |
| Phase 3 | Expense CRUD        | ✅ Complete |
| Phase 4 | Dashboard           | ✅ Complete |
| Phase 5 | Reports & Filtering | ⏳ Pending  |
| Phase 6 | UI Polish           | ⏳ Pending  |
| Phase 7 | Deployment          | ⏳ Pending  |

**Current Progress:** The project has reached the core implementation of the dashboard, routing, responsive UI, and expense editing functionality.

---

## 🎯 Learning Objectives

WalletLenz is also being developed as a practical learning project.

The project has provided hands-on experience with:

* React components
* React state management
* React Router
* REST APIs
* Express.js
* Express middleware
* JWT authentication
* bcrypt password hashing
* MongoDB
* Mongoose
* CRUD operations
* API integration
* Protected resources
* Git and GitHub
* Responsive CSS
* Data visualization with Recharts

---

## 👨‍💻 Project Status

**WalletLenz is an active development project.**

The core MERN functionality is working, including:

* User authentication
* Protected API routes
* Expense CRUD operations
* MongoDB integration
* React frontend
* Dashboard analytics
* React routing
* Responsive UI
* Expense editing across routes

The project will continue to receive additional features, improvements, testing, and deployment work before the final release.

---

**Built with ❤️ using the MERN Stack**
