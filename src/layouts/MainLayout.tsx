import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className=" min-h-screen container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
