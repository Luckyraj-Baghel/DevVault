import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back, {user?.name}
        </p>
      </div>

      <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
        {user?.name?.charAt(0)}
      </div>
    </header>
  );
};

export default Navbar;