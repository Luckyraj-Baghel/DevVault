import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { searchEverything } from "../services/search.service";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [results, setResults] = useState({
    notes: [],
    projects: [],
    snippets: [],
    bookmarks: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response =
          await searchEverything(query);

        setResults(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white">
          Searching...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-white">
          Results for "{query}"
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Notes */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <h2 className="text-2xl text-white mb-5">
              Notes ({results.notes.length})
            </h2>

            {results.notes.map((note) => (
              <div
                key={note._id}
                className="bg-slate-800 rounded-xl p-4 mb-3"
              >
                <h3 className="text-white">
                  {note.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <h2 className="text-2xl text-white mb-5">
              Projects ({results.projects.length})
            </h2>

            {results.projects.map((project) => (
              <div
                key={project._id}
                className="bg-slate-800 rounded-xl p-4 mb-3"
              >
                <h3 className="text-white">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Snippets */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <h2 className="text-2xl text-white mb-5">
              Snippets ({results.snippets.length})
            </h2>

            {results.snippets.map((snippet) => (
              <div
                key={snippet._id}
                className="bg-slate-800 rounded-xl p-4 mb-3"
              >
                <h3 className="text-white">
                  {snippet.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Bookmarks */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
            <h2 className="text-2xl text-white mb-5">
              Bookmarks ({results.bookmarks.length})
            </h2>

            {results.bookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="bg-slate-800 rounded-xl p-4 mb-3"
              >
                <h3 className="text-white">
                  {bookmark.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;