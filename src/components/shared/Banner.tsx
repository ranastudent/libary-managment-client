import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";


export default function Banner() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
  if (searchText.trim()) {
    navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
  } else {
    navigate("/books"); // fallback if empty
  }
};

  return (
    <section className="hero-banner relative bg-cover bg-center h-[75vh] sm:h-[85vh] overflow-hidden w-full">
      {/* Background set in global CSS */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Welcome to Reduan Book House
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl">
          Search and explore thousands of books in our library collection
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-md bg-white/90 rounded-md shadow-md overflow-hidden mb-6"
        >
          <Input
            type="text"
            placeholder="Search by title, author or genre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black focus:outline-none"
          />
          <Button type="submit" className="rounded-none">
            Search
          </Button>
        </form>
        {/* connect with book table  */}
        <Button asChild size="lg" variant="secondary" className="mt-2 text-shadow-amber-50">
          <a href="/books" className="text-white">Browse All Books</a>
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white z-10">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
