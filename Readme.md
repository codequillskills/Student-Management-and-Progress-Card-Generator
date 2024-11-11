# Student Progress Card Generator

This project is a web application that provides a student progress card generation and management system. It allows admins to manage roles for admins, teachers, and students. Teachers can perform CRUD operations on student reports, while students have read-only access to their reports. The application utilizes JWT authentication, with users logged out after 1 hour of inactivity, and includes a PDF download feature for each report.

## Live Demo

You can view the live application [HERE](https://studentProgressCardGenerator-codequillskills.vercel.app)

### Demo Credentials:
- Admin: 
  - Email: admin@gmail.com
  - Password: admin123
- Teacher: 
  - Email: teacher@gmail.com
  - Password: teacher123  
- Student: 
  - Email: student@gmail.com
  - Password: student123

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Role Management**:
  - Admins manage roles for admins, teachers, and students.
  - Teachers perform CRUD operations (Create, Read, Update, Delete) on reports for students.
  - Students can only view their individual reports.

- **Authentication**:
  - JWT-based authentication with a 1-hour session expiration.
  - Secure login and logout functionality.

- **Student Progress Report**:
  - Teachers can create detailed reports for each student.
  - Students can view their own reports.

- **PDF Conversion**:
  - Reports can be downloaded as PDFs by clicking the download button.

## Requirements

- Node.js
- MongoDB
- GitHub

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codequillskills/Student-Management-and-Progress-Card-Generator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Student-Management-and-Progress-Card-Generator
   ```
3. Update the `.env` file with the appropriate configuration details.

### Frontend Setup

- Navigate to the frontend folder:
  ```bash
  cd client
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the frontend server:
  ```bash
  npm run dev
  ```

### Backend Setup

- Navigate to the backend folder:
  ```bash
  cd server
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the backend server:
  ```bash
  npm start
  ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the application.
2. Admin users can manage roles and assign permissions to teachers and students.
3. Teachers can create, view, update, and delete student reports.
4. Students can log in to view their report and download it as a PDF.

## Contributing

- Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

- This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
