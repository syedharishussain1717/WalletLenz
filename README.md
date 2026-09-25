# 💰 WalletLenz – Personal Expense & Finance Management Platform

WalletLenz is a full-stack personal expense management application built with the **MERN stack**.

It allows users to securely manage expenses, view spending information, filter transactions, and analyze expenses through a dashboard.

---

## 🚀 Features

* 🔐 User registration and login
* 🔑 JWT authentication with bcrypt password hashing
* 🛡️ Protected API routes
* 💰 Expense CRUD operations
* ✏️ Edit expenses through a separate route
* 📊 Dashboard with expense statistics
* 🥧 Category-based expense pie chart
* 🔎 Category and date filtering
* 📈 Expense reports and statistics
* 🧭 React Router navigation
* 📱 Responsive Navbar and UI
* ✅ Form validation
* 💬 Success and error messages
* 🗄️ MongoDB Atlas database

---

## 🛠️ Technologies

### Frontend

* React
* Vite
* React Router
* Recharts
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* CORS
* dotenv

### Tools

* Visual Studio Code
* Git & GitHub
* Thunder Client
* MongoDB Atlas

---

## 📁 Project Structure

```text
WalletLenz/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ExpenseForm.jsx
│       │   └── ExpenseCard.jsx
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   └── ViewExpenses.jsx
│       │
│       ├── App.jsx
│       ├── config.js
│       └── index.css
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
│   └── server.js
│
└── README.md
```

---

## 🧭 Application Routes

| Route          | Purpose                          |
| -------------- | -------------------------------- |
| `/login`       | User login                       |
| `/dashboard`   | Expense dashboard                |
| `/add-expense` | Add or edit expense              |
| `/expenses`    | View, filter and manage expenses |

### Navigation Flow

```text
Login
  ↓
Dashboard
  ├── Add Expense
  └── Expenses
        ↓
      Edit
        ↓
   Add Expense
```

---

## 🔐 Authentication Flow

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT generated
    ↓
Token stored in localStorage
    ↓
Frontend sends Bearer token
    ↓
authMiddleware verifies JWT
    ↓
req.user.userId
    ↓
Protected Controller
    ↓
MongoDB
```

Protected requests use:

```text
Authorization: Bearer <token>
```

---

## 📡 Main API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Expenses

| Method | Endpoint            | Purpose             |
| ------ | ------------------- | ------------------- |
| POST   | `/api/expenses`     | Create expense      |
| GET    | `/api/expenses`     | Get user's expenses |
| PUT    | `/api/expenses/:id` | Update expense      |
| DELETE | `/api/expenses/:id` | Delete expense      |

Expense routes are protected by JWT authentication.

---

## 📊 Dashboard & Reports

The dashboard uses real expense data from MongoDB and provides:

* Total expenses
* Recent transactions
* Category totals
* Pie chart visualization

The Expenses page provides:

* Category filtering
* From-date filtering
* To-date filtering
* Combined filters
* Clear filters
* Total amount
* Transaction count
* Highest expense
* Lowest expense
* Average expense
* Category breakdown chart

---

## 📱 Responsive UI

The application has been designed for:

* 📱 Mobile
* 📲 Tablet
* 🖥️ Desktop

Responsive styling has been applied to the:

* Navbar
* Login page
* Dashboard
* Expense form
* Expense cards
* Reports and filters

---

## 📌 Development Progress

| Phase   | Description            | Status         |
| ------- | ---------------------- | -------------- |
| Phase 1 | Project Setup          | ✅ Complete     |
| Phase 2 | Authentication         | ✅ Complete     |
| Phase 3 | Expense CRUD           | ✅ Complete     |
| Phase 4 | Dashboard              | ✅ Complete     |
| Phase 5 | Reports & Filtering    | ✅ Complete     |
| Phase 6 | UI Polish & Validation | 🔄 In Progress |
| Phase 7 | Deployment             | ⏳ Pending      |

### Current Status

Core MERN functionality is working, including authentication, protected routes, expense CRUD, dashboard analytics, reports, filtering, routing, validation, and responsive UI.

---

## 🔮 Remaining Work

### Phase 6

* Final UI cleanup
* Loading states
* Error handling improvements
* Final testing

### Phase 7

* Frontend deployment
* Backend deployment
* Production environment variables
* Production API configuration
* MongoDB production configuration
* Final deployment testing

---

## 🎯 Learning Goals

WalletLenz is also a practical MERN learning project covering:

* React components and state
* React Router
* REST APIs
* Express.js
* Middleware
* JWT authentication
* bcrypt
* MongoDB & Mongoose
* CRUD operations
* API integration
* Responsive CSS
* Recharts
* Git & GitHub
* Deployment

---

## 👨‍💻 Project Status

**WalletLenz is an active development project.**

The core application is functional, and the remaining work focuses on final UI improvements, testing, and deployment.

**Built with ❤️ using the MERN Stack**
