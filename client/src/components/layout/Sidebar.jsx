import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "Notes",
      path: "/notes",
      icon: "📝",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "📁",
    },
    {
      name: "Snippets",
      path: "/snippets",
      icon: "💻",
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: "🔖",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (
    <aside className="hidden md:flex w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen p-5 flex-col">

      {/* Logo */}
      <div className="px-3 py-2 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dev<span className="text-indigo-500">Vault</span>
        </h1>

        <p className="text-sm font-medium text-slate-600 mt-1">
          Developer Knowledge Hub
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span
                className={`text-base ${
                  isActive
                    ? "opacity-100"
                    : "opacity-70 group-hover:opacity-100"
                }`}
              >
                {item.icon}
              </span>

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">
            DevVault
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Keep learning. Keep building.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;