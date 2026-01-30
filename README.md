## 🎬 MERN Netflix Clone

Full-stack Netflix clone using **MongoDB, Express, React, Node.js & Bootstrap**.

### Features
- **Auth**: JWT-based login (email + password)
- **Movies**: Data from **TMDB API**
- **UI**: Netflix-style layout with rows and details
- **State**: Simple global auth context with `localStorage` persistence

---

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB Atlas** cluster
- **TMDB API key**

---

### 1. Backend setup

From the project root:

```bash
cd backend
npm install
```

Create `.env` in `backend` (copy from `.env.example`) and fill:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SEC=your_random_jwt_secret
```

Then start the API:

```bash
cd backend
node server.js      # or: npm start
```

Backend runs at: **`http://localhost:3000`**

---

### 2. Frontend setup

From the project root:

```bash
cd frontend
npm install
```

Create `.env` in `frontend` (copy from `.env.example`) and set:

```env
REACT_APP_TMDB_KEY=your_tmdb_api_key
```

Then start the React app:

```bash
cd frontend
npm start
```

The React dev server will open at **`http://localhost:3000`** or ask to use another port (for example `3001`) if 3000 is already used by the backend.

---

### 3. Auth & API endpoints

- Login: `POST http://localhost:3000/api/auth/login`
- Register: `POST http://localhost:3000/api/auth/register`

Make sure the **backend is running** before trying to log in from the frontend.

---

### 4. Environment files summary

- **Backend**: `backend/.env` → `PORT`, `MONGO_URI`, `JWT_SEC`
- **Frontend**: `frontend/.env` → `REACT_APP_TMDB_KEY`

Both `.env` files are **git-ignored** and should not be committed.