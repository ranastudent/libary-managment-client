Library Management System

A full-stack Library Management System built with React, TypeScript, Node.js, Express, and MongoDB. This app enables users to manage books, borrow them, and track borrow summaries with a responsive UI and light/dark theme support.

Features
 Add, edit, and delete books with detailed information

 Borrow books by specifying quantity and due date

 View borrow summary reports showing total borrowed quantities

 Responsive design supporting mobile and desktop layouts

 Light, dark, and system theme toggle powered by shadcn UI components

 API data fetching and caching using Redux Toolkit Query (RTK Query)

 Robust form validation and error handling with react-hook-form and react-toastify


Tech Stack

  Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn UI components, Redux Toolkit + RTK Query, react-hook-form

  Backend: Node.js, Express, MongoDB, Mongoose

  Other: React Router, react-toastify, lucide-react icons


Installation & Setup

1.Clone the repository:
  git clone https://github.com/your-username/library-management-system.git
  cd library-management-system

2.Install dependencies for frontend and backend:
  npm install
  
3.Run the backend server:
 npm run dev:server
 
4.Run the frontend development server:
  npm run dev:client

5.Open your browser at http://localhost:3000 (or the configured port) to use the app.


Usage

  Navigate to Books to view all available books.

 Add new books using the Add Book page.

 Borrow books by clicking the Borrow action next to a book.

 Check the Borrow Summary to view aggregate borrowing statistics.

 Toggle between light and dark themes using the theme switcher in the navbar.


Contributing

Contributions are welcome! Please open issues or submit pull requests to improve the project.
