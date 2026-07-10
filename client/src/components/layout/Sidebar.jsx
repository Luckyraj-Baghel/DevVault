import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Notes",
      path: "/notes",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Snippets",
      path: "/snippets",
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-10">
        DevVault
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block w-full text-left px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;