import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            Dev<span className="text-indigo-600">Vault</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="
                  px-5 py-2.5
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  rounded-xl
                  font-medium
                  shadow-sm
                  transition
                "
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    px-5 py-2.5
                    text-slate-600
                    border border-slate-200
                    rounded-xl
                    font-medium
                    hover:bg-slate-50
                    hover:text-slate-900
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-5 py-2.5
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    rounded-xl
                    font-medium
                    shadow-sm
                    transition
                  "
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 text-center">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-7">
            Developer Knowledge Workspace
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-5xl mx-auto">
            Organize Your Entire
            <span className="text-indigo-600">
              {" "}Developer Journey
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl mt-7 max-w-3xl mx-auto leading-8">
            Store notes, projects, snippets and bookmarks
            in one beautiful developer workspace designed
            specifically for developers.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            {user ? (
              <Link
                to="/dashboard"
                className="
                  px-8 py-4
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  rounded-2xl
                  text-lg
                  font-medium
                  shadow-lg
                  shadow-indigo-600/20
                  transition
                "
              >
                Open Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="
                    px-8 py-4
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    rounded-2xl
                    text-lg
                    font-medium
                    shadow-lg
                    shadow-indigo-600/20
                    transition
                  "
                >
                  Get Started →
                </Link>

                <Link
                  to="/login"
                  className="
                    px-8 py-4
                    bg-white
                    border border-slate-200
                    text-slate-700
                    rounded-2xl
                    text-lg
                    font-medium
                    hover:bg-slate-50
                    hover:border-slate-300
                    transition
                  "
                >
                  Login
                </Link>
              </>
            )}

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">

        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 mb-3">
            Everything in one place
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Everything You Need
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            Keep your development knowledge organized,
            accessible and easy to manage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Notes */}
          <div className="
            bg-white
            border border-indigo-100
            rounded-3xl
            p-7
            shadow-sm
            hover:-translate-y-1
            hover:shadow-md
            transition-all duration-300
          ">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-6">
              📝
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Notes
            </h3>

            <p className="text-slate-500 leading-7">
              Store concepts, interview preparation notes
              and learning material.
            </p>
          </div>

          {/* Projects */}
          <div className="
            bg-white
            border border-violet-100
            rounded-3xl
            p-7
            shadow-sm
            hover:-translate-y-1
            hover:shadow-md
            transition-all duration-300
          ">
            <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-2xl mb-6">
              🚀
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Projects
            </h3>

            <p className="text-slate-500 leading-7">
              Track progress, tech stack and important
              project resources.
            </p>
          </div>

          {/* Snippets */}
          <div className="
            bg-white
            border border-emerald-100
            rounded-3xl
            p-7
            shadow-sm
            hover:-translate-y-1
            hover:shadow-md
            transition-all duration-300
          ">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-6">
              💻
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Snippets
            </h3>

            <p className="text-slate-500 leading-7">
              Save reusable code snippets and access them
              instantly.
            </p>
          </div>

          {/* Bookmarks */}
          <div className="
            bg-white
            border border-amber-100
            rounded-3xl
            p-7
            shadow-sm
            hover:-translate-y-1
            hover:shadow-md
            transition-all duration-300
          ">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl mb-6">
              🔖
            </div>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Bookmarks
            </h3>

            <p className="text-slate-500 leading-7">
              Never lose useful articles, videos and
              documentation links again.
            </p>
          </div>

        </div>
      </section>

      {/* Why DevVault */}
      <section className="px-6 md:px-8 py-24">

        <div className="
          max-w-5xl
          mx-auto
          bg-white
          border border-indigo-100
          rounded-3xl
          p-10 md:p-16
          text-center
          shadow-sm
          relative overflow-hidden
        ">

          {/* Subtle accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-indigo-600 rounded-full" />

          <p className="text-sm font-semibold text-indigo-600 mb-4">
            Why DevVault?
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-7">
            Stop Losing Valuable Resources
          </h2>

          <p className="text-slate-500 text-lg leading-8 max-w-3xl mx-auto">
            Developers usually save knowledge in browser
            bookmarks, random text files, GitHub stars,
            WhatsApp chats and sticky notes.
          </p>

          <p className="text-slate-600 text-lg leading-8 max-w-3xl mx-auto mt-5">
            DevVault brings everything together into one
            powerful and searchable workspace.
          </p>

        </div>

      </section>

      {/* Final CTA */}
      {!user && (
        <section className="px-6 md:px-8 pb-24">

          <div className="
            max-w-5xl
            mx-auto
            rounded-3xl
            bg-indigo-600
            p-10 md:p-14
            text-center
            shadow-xl
            shadow-indigo-600/20
          ">

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to organize your developer journey?
            </h2>

            <p className="text-indigo-100 mt-4 text-lg">
              Start building your personal developer knowledge vault today.
            </p>

            <Link
              to="/register"
              className="
                inline-block
                mt-8
                px-7 py-3.5
                bg-white
                text-indigo-600
                rounded-xl
                font-semibold
                hover:bg-indigo-50
                transition
              "
            >
              Create Your Vault →
            </Link>

          </div>

        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center">

        <p className="text-slate-500 text-sm">
          Built with{" "}
          <span className="font-medium text-slate-700">
            React
          </span>
          ,{" "}
          <span className="font-medium text-slate-700">
            Node.js
          </span>
          ,{" "}
          <span className="font-medium text-slate-700">
            Express
          </span>{" "}
          and{" "}
          <span className="font-medium text-slate-700">
            MongoDB
          </span>{" "}
          🚀
        </p>

        <p className="text-slate-400 text-xs mt-2">
          DevVault — Your personal developer knowledge workspace.
        </p>

      </footer>

    </div>
  );
};

export default HomePage;