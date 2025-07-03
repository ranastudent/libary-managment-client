import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-background/100 shadow-sm sticky top-0 backdrop-blur-xl z-50 transition-colors duration-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-wide">
                Reduan
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Book House
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 uppercase text-sm font-medium text-foreground">
            <Link
              to="/"
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="hover:text-primary transition-colors duration-200"
            >
              Books
            </Link>
            <Link
              to="/create-book"
              className="hover:text-primary transition-colors duration-200"
            >
              Add Book
            </Link>
            <Link
              to="/borrow-summary"
              className="hover:text-primary transition-colors duration-200"
            >
              Borrow Summary
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleDropdown}
              aria-label="Toggle menu"
              className="focus:outline-none text-foreground"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-2 bg-background shadow-md rounded-md p-4 space-y-2 border border-border">
          <Link
            to="/"
            onClick={toggleDropdown}
            className="block text-foreground hover:text-primary transition-colors duration-200"
          >
            HOME
          </Link>
          <Link
            to="/books"
            onClick={toggleDropdown}
            className="block text-foreground hover:text-primary transition-colors duration-200"
          >
            BOOKS
          </Link>
          <Link
            to="/create-book"
            onClick={toggleDropdown}
            className="block text-foreground hover:text-primary transition-colors duration-200"
          >
            ADD BOOK
          </Link>
          <Link
            to="/borrow-summary"
            onClick={toggleDropdown}
            className="block text-foreground hover:text-primary transition-colors duration-200"
          >
            BORROW SUMMARY
          </Link>
        </div>
      )}
    </nav>
  );
}
