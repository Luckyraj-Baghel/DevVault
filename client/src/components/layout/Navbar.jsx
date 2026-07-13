import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim();

      if (!query) return;

      navigate(
        `/search?query=${encodeURIComponent(
          query
        )}`
      );

      setSearchQuery("");
    }
  };

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Search Section */}
      <div className="flex-1 flex justify-center px-10">
        <input
          type="text"
          placeholder="Search DevVault..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          onKeyDown={handleSearch}
          className="
        w-full
        max-w-xl
        bg-slate-900
        border border-slate-800
        rounded-xl
        px-5 py-3
        text-white
        placeholder:text-slate-500
        focus:outline-none
        focus:border-indigo-500
      "
        />
      </div>

      {/* Avatar */}
      <Link
        to="/profile"
        className="
    h-12 w-12 rounded-full bg-indigo-600
    flex items-center justify-center
    text-white font-bold
    hover:bg-indigo-700
    transition
    cursor-pointer
  "
      >
        {user?.name?.charAt(0)}
      </Link>

    </header>
  );
};

export default Navbar;