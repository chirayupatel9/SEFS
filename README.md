
# SEFS - Task Management System

**SEFS** (Secure and Efficient File Storage) is a full-stack task management application with a Trello-like dashboard. It features a React frontend with a modern UI and a Flask backend with MongoDB integration.

## Features

- **Trello-like Dashboard**: Modern React UI with drag-and-drop functionality
- **Task Management**: Create, update, and track tasks across different statuses
- **Real-time Updates**: Live task status updates and management
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Docker Support**: Complete containerization with docker-compose
- **Responsive Design**: Mobile-friendly interface

## Project Structure

- **Backend**:
  - `app.py`: Flask API server with task management endpoints
  - `dbconfig.py`: MongoDB connection configuration
  - `functions.py`: Database operations and business logic
  - `requirements.txt`: Python dependencies

- **Frontend**:
  - `frontend/`: React application with Trello-like UI
  - `frontend/src/components/`: React components (Board, TaskCard, etc.)
  - `frontend/src/services/`: API service layer

- **Docker**:
  - `Dockerfile`: Backend container configuration
  - `frontend/Dockerfile`: Frontend container configuration
  - `docker-compose.yml`: Multi-service orchestration

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/chirayupatel9/SEFS.git
   cd SEFS
   ```

2. Start all services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Manual Setup

1. **Backend Setup**:
   ```bash
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```

## API Endpoints

- `GET /show` - Get all tasks
- `POST /add_task` - Create a new task
- `PATCH /update_task` - Update task details
- `PATCH /update_task_status` - Update task status

## Task Status Flow

- **Pending** → **In Progress** → **In Review** → **Completed**

## License

This project is licensed under the MIT License.
