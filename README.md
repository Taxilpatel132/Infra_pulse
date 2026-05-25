# Infra Pulse

Infra Pulse is a comprehensive full-stack application designed for managing deployments, continuously monitoring services, and providing real-time analytics and logs.

Built with a Node.js/Express backend and a React (Vite) frontend, the platform utilizes background workers, task queues (Redis/BullMQ), and WebSockets (Socket.io) to give you instant feedback on the health and status of your infrastructure operations.

---

## 🛠️ Tech Stack

### Backend

- **Node.js & Express.js** - API routing and server setup.
- **MongoDB & Mongoose** - Database and schema modeling.
- **Redis & BullMQ** - Reliable task queueing for deployments and monitoring.
- **Socket.io** - Real-time events and bidirectional communication.
- **Argon2 & JWT** - Secure password hashing and token-based authentication.
- **Node-Cron** - Scheduling periodic background jobs.

### Frontend

- **React (with Vite)** - Highly responsive UI components and fast builds.
- **Socket.io-client** - Real-time listeners for analytics and deployment updates.

---

## 📂 Project Structure

### Backend (`/backend/src/`)

The backend is organized using a layered architecture to keep routing, business logic, and background processing separated and maintainable.

- **Entry Points**
  - `server.js` - Initializes the HTTP server and attaches WebSockets.
  - `app.js` - Configures Express app, middleware, and registers routes.
  - `socket.js` - Handles real-time Socket.io connections and event broadcasting.

- **Core Directories**
  - `config/` - App configurations (e.g., `db.js` for MongoDB connection).
  - `controllers/` - Handles incoming HTTP requests and responses. Maps to `auth`, `analytics`, `deployment`, and `service` resources.
  - `services/` - Contains core business logic isolated from request/response objects formats.
  - `routes/` - Express route definitions mapping endpoints to controllers.
  - `models/` - Mongoose database schemas (`User.js`, `Service.js`, `Deployment.js`, `MonitoringLog.js`).
  - `middleware/` - Custom middleware like `authMiddleware.js` for verifying JWT tokens.

- **Background Jobs & Processing**
  - `queues/` - Redis/BullMQ queue definitions (`deploymentQueue.js`, `monitorQueue.js`).
  - `workers/` - BullMQ workers orchestrating background tasks like triggering a deployment or executing service checks (`deploymentWorker.js`, `monitorWorker.js`).
  - `jobs/` - Cron jobs and scheduled tasks (`monitorServices.js`).

- **Utilities (`utils/`)**
  - `healthCheck.js` - Logic for pinging or verifying the health of services.
  - `executeCommand.js` - Safely executes shell commands for system deployments.
  - `jwtUtils.js` & `hashUtils.js` - Tokens and cryptography helpers.

### Frontend (`/frontend/src/`)

- `App.jsx` & `main.jsx` - Root React components and application wrappers.
- `socket.js` - Singleton for connecting configuring the Socket.io client.
- `api/` - Axios configurations and grouped API call functions (`index.js`).
- `pages/`
  - `Login.jsx` - Authentication view.
  - `Deployments.jsx` & `DeploymentLogs.jsx` - Manage and track CI/CD deployments.
  - `Services.jsx` - View configuration and status of registered services.
  - `MonitoringLogs.jsx` - Historical uptime and failure logs.
  - `Analytics.jsx` - Real-time, aggregated data and graphs.

---

## ✨ Features

- **Service Monitoring:** Continually ping and health-check registered infrastructure services.
- **Automated Deployments:** Register and trigger deployments using a robust queue system (BullMQ) avoiding blocking the main thread.
- **Real-Time Data:** View active deployment execution logs and service uptimes in real-time via Socket.io.
- **Secure Architecture:** Role-based access and endpoints protected by JWT and Argon2 hashing.
- **Analytics Dashboard:** Graphical overviews of service health and deployment success rates.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18+)
- MongoDB (Running locally or via Atlas)
- Redis Server (Running locally on default port `6379`)

### 1. Backend Setup

```bash
cd backend
npm install
```

Configure your environment variables in a `.env` file inside the `/backend` directory (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, `REDIS_URL`).

Start the development server:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Configure your `.env` or variables if needed for mapping to `/api` routes or socket hosts.

Start the Vite dev server:

```bash
npm run dev
```

---

## 📜 License

ISC
