# 🧾 Invoice App

A full-stack Invoice Module built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to create invoices, manage line items, record payments, and archive/restore invoices.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |

---

## ✨ Features

- 📄 Create invoices with dynamic line items and live preview
- 💰 Add payments with overpayment protection
- ✅ Auto-update invoice status to **PAID** when fully paid
- 🗄️ Archive and restore invoices
- 📋 View all invoices with archived toggle
- 📊 Full invoice details with line items, totals, and payment history
- 🔴 Overdue detection — invoices past due date automatically show **OVERDUE** badge

---

## 📁 Project Structure

```
my-invoice-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── invoice.controller.js
│   │   ├── models/
│   │   │   ├── Invoice.js
│   │   │   ├── InvoiceLine.js
│   │   │   └── Payment.js
│   │   ├── routes/
│   │   │   └── invoice.routes.js
│   │   └── db.js
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── InvoiceHeader.jsx
    │   │   ├── LineItemsTable.jsx
    │   │   ├── TotalsSection.jsx
    │   │   ├── PaymentsSection.jsx
    │   │   └── AddPaymentModal.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── InvoiceDetails.jsx
    │   │   └── CreateInvoice.jsx
    │   ├── services/
    │   │   └── api.js
    │   └── App.jsx
    └── index.html
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VaibhaviMistri/invoice-app.git
cd invoice-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder by copying the example file:
```bash
cp .env.example .env
```

Then open `.env` and update the values if needed:
```env
PORT=8000                                          # Port the backend server will run on
MONGO_URI=mongodb://localhost:27017/invoice-app    # Your MongoDB connection string
```

> If you are using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:
> `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/invoice-app`
```

#### Seed Dummy Data (Optional but recommended for testing)

```bash
npm run seed
```

This will create a sample invoice with line items and a payment. Copy the printed Invoice ID — you can use it to test the APIs.

#### Run the Backend

```bash
npm run dev
```

Server will start at `http://localhost:8000`

You should see:
```
Server running on PORT 8000
MongoDB connected
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at `http://localhost:5173`

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — lists all invoices with archive toggle |
| `/invoices/create` | Create a new invoice with live preview |
| `/invoices/:id` | Invoice details — line items, payments, totals |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | Get all invoices (supports `?showArchived=true`) |
| GET | `/api/invoices/:id` | Get invoice details with line items and payments |
| POST | `/api/invoices/create` | Create a new invoice with line items |
| POST | `/api/invoices/:id/payments` | Add a payment to an invoice |
| POST | `/api/invoices/archive` | Archive an invoice |
| POST | `/api/invoices/restore` | Restore an archived invoice |

---

## 🧠 Business Rules

- Line Total = Quantity × Unit Price
- Invoice Total = Sum of all line totals
- Balance Due = Total − Amount Paid
- Overpayment is **not allowed**
- When Balance Due reaches 0 → status automatically changes to **PAID**
- Archived invoices are hidden from the home page by default
- If `dueDate < today` and status is not `PAID` → invoice is marked as **OVERDUE**

---

## 📸 App Preview

### Home Page
- Lists all active invoices
- Toggle to show/hide archived invoices
- Quick access to create a new invoice

### Create Invoice Page
- Left side: form with customer name, due date, and dynamic line items
- Right side: live preview updates as you type

### Invoice Details Page
- Full invoice info with status badge
- Line items table
- Totals section (Total, Amount Paid, Balance Due)
- Payment history with Add Payment button
- Archive / Restore invoice button

---

## 🤝 Contributing

This project was built as part of a Full Stack Internship Assignment. Feel free to fork and improve!