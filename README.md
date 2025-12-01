# EMS (Event Management System)

A full‑stack Event Management System (EMS) built with **Django + Django REST Framework**, **Channels**, **ASGI (Daphne)**, and a **React** frontend. The project provides event creation, registration, authentication, and real‑time features.

This README explains how to set up and run the project in development. Deployment is not yet included.

---

## 🚀 Features

* Event creation, updating, and deletion
* Event registration & user management
* Swagger & ReDoc API documentation
* Real‑time support using **Django Channels**
* Modern React frontend with Vite

---

## 📦 Tech Stack

### **Backend**

* Python / Django
* Django REST Framework
* Django Channels
* Daphne (ASGI server)
* MySQL

### **Frontend**

* React + TypeScript
* Vite
* Redux Toolkit

---

## 🛠️ Local Development Setup

### **1. Clone the repository**

```bash
git clone <>
cd EMS
```

### **2. Create & activate virtual environment**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### **3. Install backend dependencies**

```bash
pip install
```

### **4. Apply migrations**

```bash
python manage.py migrate
```

### **5. Run ASGI server (Daphne)**

```bash
daphne -p 8000 EMS.asgi:application
```

If you want to run Django's regular dev server:

```bash
python manage.py runserver
```

---

## 🎨 Frontend Setup

From the `frontend/` directory:

### **1. Install dependencies**

```bash
yarn or yarn install
```

### **2. Start development server**

```bash
yarn dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## 📚 API Documentation

After running the backend, visit:

* **Swagger UI:** [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)
* **ReDoc:** [http://127.0.0.1:8000/redoc/](http://127.0.0.1:8000/redoc/)

---

## 📁 Project Structure

```
backend/
    EMS/
        ├── EMS/                
        ├── events/
        ├── accounts/
        ├── .gitignore
        ├── .env
        └── manage.py

frontend/
    src/
        components/
        config/
        features/
        hooks/
        routes/
        store/
        services/
        types/
        utils/
        index.tsx
        App.tsx
        main.tsx
    public/
    .env
    index.html
    yarn.lock
    tsconfig.json
    vite.config.ts
    package.json

```

---

## 🔧 Environment Variables

Create a `.env` file in the backend and frontend directories:

```
For backend:
    DB_NAME=ems
    DB_USER=your user
    DB_PASSWORD=your password
    DB_HOST=localhost
    DB_PORT=3306

    DJANGO_ENV=development
    FRONTEND_URL=http://localhost:5173

For frontend:
    VITE_BACKEND_URL=http://127.0.0.1:8000/api/

```

---

## 📌 Notes

* This project is currently **not deployed**.
* Daphne was configured and notifications module created in backend to later support web sockets.

---

## 📄 License

MIT — Free to use and modify.

---
