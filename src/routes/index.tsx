import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BookTable from "../pages/BookTable";
import EditBookPage from "../pages/EditBookPage";
import BorrowBookPage from "../pages/BorrowBookPage";
import BorrowSummaryPage from "../pages/BorrowSummaryPage";
import CreateBookPage from "../pages/CreateBookPage";
import HomePage from "../pages/HomePage";
import BookDetailsPage from "../pages/BookDetailsPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",  
        element: <HomePage />,
      },
      {
        path: "/book/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/books",
        element: <BookTable />,
      },
      {
        path:"/edit-book/:id",
        element: <EditBookPage />
      },
      {
        path:"/borrow/:bookId",
        element: <BorrowBookPage />
      },
      {
        path:"/borrow-summary",
        element: <BorrowSummaryPage />
      },
      {
        path:"/create-book",
        element: <CreateBookPage />
      }
      
    ],
  },
]);
