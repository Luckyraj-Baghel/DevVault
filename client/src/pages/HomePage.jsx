import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Navbar */}
    <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
      <h1 className="text-3xl font-bold text-indigo-500">
        DevVault
      </h1>

      <div className="flex gap-4">
        {user ? (
          <Link
            to="/dashboard"
            className="px-5 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 border border-slate-700 rounded-xl hover:bg-slate-900 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>

    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-8 py-32 text-center">
      <h1 className="text-6xl font-bold leading-tight">
        Organize Your Entire
        <span className="text-indigo-500"> Developer Journey</span>
      </h1>

      <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto">
        Store notes, projects, snippets and bookmarks
        in one beautiful developer workspace designed
        specifically for developers.
      </p>

      <div className="mt-12 flex justify-center gap-6 flex-wrap">
        {user ? (
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-indigo-600 rounded-2xl text-lg hover:bg-indigo-700 transition"
          >
            Open Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="px-8 py-4 bg-indigo-600 rounded-2xl text-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 border border-slate-700 rounded-2xl text-lg hover:bg-slate-900 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>

    {/* Features */}
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-16">
        Everything You Need
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            📝 Notes
          </h3>

          <p className="text-slate-400">
            Store concepts, interview preparation notes
            and learning material.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            🚀 Projects
          </h3>

          <p className="text-slate-400">
            Track progress, tech stack and important
            project resources.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            💻 Snippets
          </h3>

          <p className="text-slate-400">
            Save reusable code snippets and access them
            instantly.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-4">
            🔖 Bookmarks
          </h3>

          <p className="text-slate-400">
            Never lose useful articles, videos and
            documentation links again.
          </p>
        </div>

      </div>
    </section>

    {/* Why DevVault */}
    <section className="max-w-5xl mx-auto px-8 py-24 text-center">
      <h2 className="text-4xl font-bold mb-8">
        Stop Losing Valuable Resources
      </h2>

      <p className="text-slate-400 text-lg leading-8">
        Developers usually save knowledge in browser
        bookmarks, random text files, GitHub stars,
        WhatsApp chats and sticky notes.
        <br /><br />
        DevVault brings everything together into one
        powerful and searchable workspace.
      </p>
    </section>

    {/* Footer */}
    <footer className="border-t border-slate-800 py-10 text-center text-slate-500">
      Built with React, Node.js, Express and MongoDB 🚀
    </footer>

  </div>
);
};

export default HomePage;