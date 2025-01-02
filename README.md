# API Documentation for Express Application

## Overview
This document describes the API routes and configurations for the Express application. Each route handles specific CRUD operations for various resources. The application uses middleware for request parsing, CORS, and file uploads.

## Dependencies
- **express**: Framework for building the server.
- **body-parser**: Middleware for parsing incoming request bodies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **mongoose**: MongoDB object modeling tool.

## Middleware Setup
- **bodyParser.json()**: Parses incoming JSON payloads.
- **bodyParser.urlencoded({ extended: true })**: Parses URL-encoded data.
- **cors()**: Enables CORS for all routes.

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
```

---

## Routes

### OTP Routes
- **Path**: `/api/otp`
- **Controller**: `otpController.mjs`
- **Endpoints**:
  - `POST /generate`: Generate and send an OTP.
  - `POST /verify`: Verify an OTP.

### User Routes
- **Path**: `/api/user`
- **Controller**: `UserController.mjs`
- **Endpoints**:
  - `POST /`: Create a new user.
  - `GET /`: Retrieve all users.
  - `GET /:id`: Retrieve a user by ID.
  - `PUT /:id`: Update user details by ID.
  - `DELETE /:id`: Delete a user by ID.

### Contact Routes
- **Path**: `/api/contact`
- **Controller**: `ContactController.mjs`
- **Endpoints**:
  - `POST /`: Create a new contact.
  - `GET /`: Retrieve all contacts.
  - `GET /:id`: Retrieve a contact by ID.
  - `PUT /:id`: Update contact details by ID.
  - `DELETE /:id`: Delete a contact by ID.

### Leave Routes
- **Path**: `/api/leaves`
- **Controller**: `LeaveController.mjs`
- **Endpoints**:
  - `POST /`: Create a new leave.
  - `GET /`: Retrieve all leaves.
  - `GET /:id`: Retrieve leave details by ID.
  - `PUT /:id`: Update leave details by ID.
  - `DELETE /:id`: Delete a leave by ID.

### Overtime Routes
- **Path**: `/api/overtime`
- **Controller**: `OvertimeController.mjs`
- **Endpoints**:
  - `POST /`: Create a new overtime record.
  - `GET /`: Retrieve all overtime records.
  - `GET /:id`: Retrieve overtime details by ID.
  - `PUT /:id`: Update overtime details by ID.
  - `DELETE /:id`: Delete an overtime record by ID.

### Project Routes
- **Path**: `/api/projects`
- **Controller**: `ProjectController.mjs`
- **Endpoints**:
  - `POST /`: Create a new project.
  - `GET /`: Retrieve all projects.
  - `GET /:id`: Retrieve project details by ID.
  - `PUT /:id`: Update project details by ID.
  - `DELETE /:id`: Delete a project by ID.

### Holiday Routes
- **Path**: `/api/holidays`
- **Controller**: `HolidayController.mjs`
- **Endpoints**:
  - `POST /`: Create a new holiday.
  - `GET /`: Retrieve all holidays.
  - `GET /:id`: Retrieve holiday details by ID.
  - `PUT /:id`: Update holiday details by ID.
  - `DELETE /:id`: Delete a holiday by ID.

### Employee Routes
- **Path**: `/api/employees`
- **Controller**: `EmployeeController.mjs`
- **Endpoints**:
  - `POST /`: Create a new employee. Supports file upload for `employee_picture`.
  - `GET /`: Retrieve all employees.
  - `GET /:id`: Retrieve employee details by ID.
  - `PUT /:id`: Update employee details by ID. Supports file upload for `employee_picture`.
  - `DELETE /:id`: Delete an employee by ID.

### Client Routes
- **Path**: `/api/clients`
- **Controller**: `ClientController.mjs`
- **Endpoints**:
  - `POST /`: Create a new client. Supports file upload for `client_picture`.
  - `GET /`: Retrieve all clients.
  - `GET /:id`: Retrieve client details by ID.
  - `PUT /:id`: Update client details by ID.
  - `DELETE /:id`: Delete a client by ID.

---

## Database Connection
- **File**: `mongoDbConfig.mjs`
- Connects to MongoDB using Mongoose.
- Called during application startup:

```javascript
connectDb();
```

---

## Error Handling
Global error handling middleware logs errors and returns appropriate responses:

```javascript
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    error: err.error || "An unexpected error occurred."
  });
});
```

---

## Starting the Server
The application listens on a specified port (default: 3000):

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## File Upload Middleware
- **File**: `uplodeFile.mjs`
- Manages file uploads for employee and client routes using `multer`.

---

## Root Route
- **Path**: `/`
- **Description**: Basic health check for the API.
- **Response**: Returns a simple `"hello"` message.

```javascript
app.get("/", (req, res) => {
  res.send("hello");
});
```

