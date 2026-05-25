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

## 🧠 Architecture & Real Implementation Flows

To make it easier to understand how **Infra Pulse** operates under the hood, here is a breakdown of the core workflows:

### 1. The Deployment Pipeline (Asynchronous Tasks)

Since executing deployment shell scripts (pulling code, building, restarting services) takes time, the main Node.js process is never blocked:

- **Trigger:** A user hits the `/api/deployments` endpoint. The controller creates a `Deployment` record in MongoDB marked as `pending`.
- **Queueing:** The backend pushes the deployment details to the Redis-backed **BullMQ Deployment Queue** (`queues/deploymentQueue.js`). The HTTP request immediately responds with a success status.
- **Processing:** The `deploymentWorker.js` picks up the job in the background, updates the DB to `in-progress`, and uses `utils/executeCommand.js` to run the actual bash execution.
- **Real-Time Logs:** Throughout the execution, the worker uses Socket.io to emit log streams back to the frontend. The user sees text auto-scrolling on the `DeploymentLogs` page instantly.

### 2. Service Monitoring & Uptime Tracking

- **Scheduling:** Using `node-cron` (`jobs/monitorServices.js`), the Node backend periodically wakes up (e.g., every 60 seconds) to fetch active services from the DB.
- **Queueing Checks:** Instead of pinging them synchronously, it spreads the load by queueing each service check into the **BullMQ Monitor Queue**.
- **Execution:** The `monitorWorker.js` processes these items. It passes the URL/IP to `utils/healthCheck.js`, checking ping, HTTP status, or custom health ports.
- **DB & WebSockets:** Results are saved to the `MonitoringLog` model. If a service goes offline, a server event is broadcast via WebSockets to instantly turn the service's indicator red on the frontend without requiring a page refresh.

### 3. Analytics Aggregation & Data Flow

- When a user views the Analytics dashboard, `analyticsController` queries MongoDB to aggregate statistics (e.g., average uptime, total down incidents, deployment success rates vs. failures).
- If an active incident occurs while viewing the dashboard, web sockets stream live metrics allowing the graphs to update on the fly in React.

### 4. API & Authentication Flow

- When logging in (`pages/Login.jsx`), the backend compares hashes against the `User` model using **Argon2** (`utils/hashUtils.js`).
- A JSON Web Token (JWT) is returned and stored in the client. Subsequent calls to trigger deployments or fetch logs pass this token. The `authMiddleware.js` intercepts and validates it to ensure full systemic security.

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
