import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim();

      if (!query) return;

      navigate(
        `/search?query=${encodeURIComponent(query)}`
      );

      setSearchQuery("");
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;

    const titles = {
      "/dashboard": "Dashboard",
      "/notes": "Notes",
      "/projects": "Projects",
      "/snippets": "Snippets",
      "/bookmarks": "Bookmarks",
      "/search": "Search",
      "/profile": "Profile",
    };

    return titles[path] || "DevVault";
  };

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur-md px-5 md:px-8 flex items-center gap-6">

      {/* Mobile Brand */}
      <div className="md:hidden shrink-0">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-slate-900"
        >
          Dev<span className="text-indigo-500">Vault</span>
        </Link>
      </div>

      {/* Page Heading */}
      <div className="hidden md:block shrink-0">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {getPageTitle()}
        </h1>

        <p className="text-sm font-medium text-slate-600 mt-1">
          Welcome back, {user?.name || "Developer"}
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-xl">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg">
            ⌕
          </span>

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
              bg-slate-100
              border border-slate-200
              rounded-xl
              pl-11 pr-20 py-3
              text-sm text-slate-900
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-200
              focus:bg-white
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/10
              hover:border-slate-300
            "
          />

          <span className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded-md px-2 py-1">
            Enter
          </span>

        </div>
      </div>

      {/* Profile */}
      <Link
        to="/profile"
        className="
          shrink-0
          h-11 w-11
          rounded-full
          bg-indigo-600
          border border-indigo-400/20
          flex items-center justify-center
          text-white
          font-semibold
          shadow-lg
          shadow-indigo-600/10
          hover:bg-indigo-500
          hover:scale-105
          transition-all
          duration-200
        "
        title="View profile"
      >
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </Link>

    </header>
  );
};

export default Navbar;