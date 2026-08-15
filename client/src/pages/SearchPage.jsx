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
        const response = await searchEverything(query);

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
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-slate-500 text-sm">
            Searching...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const totalResults =
    results.notes.length +
    results.projects.length +
    results.snippets.length +
    results.bookmarks.length;

  const sections = [
    {
      title: "Notes",
      items: results.notes,
      accent: "indigo",
      icon: "📝",
    },
    {
      title: "Projects",
      items: results.projects,
      accent: "violet",
      icon: "🚀",
    },
    {
      title: "Snippets",
      items: results.snippets,
      accent: "emerald",
      icon: "💻",
    },
    {
      title: "Bookmarks",
      items: results.bookmarks,
      accent: "amber",
      icon: "🔖",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-indigo-600 mb-2">
            Global Search
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Search Results
          </h1>

          <p className="text-slate-500 mt-2">
            Showing results for{" "}
            <span className="font-medium text-slate-700">
              "{query}"
            </span>
          </p>

          <p className="text-sm text-slate-400 mt-1">
            {totalResults}{" "}
            {totalResults === 1 ? "result" : "results"} found
          </p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {sections.map((section) => (
            <div
              key={section.title}
              className={`
                bg-white
                rounded-3xl
                p-6
                border
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md
                ${
                  section.accent === "indigo"
                    ? "border-indigo-100"
                    : section.accent === "violet"
                    ? "border-violet-100"
                    : section.accent === "emerald"
                    ? "border-emerald-100"
                    : "border-amber-100"
                }
              `}
            >

              {/* Section Header */}
              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      h-10 w-10
                      rounded-xl
                      flex items-center justify-center
                      ${
                        section.accent === "indigo"
                          ? "bg-indigo-50"
                          : section.accent === "violet"
                          ? "bg-violet-50"
                          : section.accent === "emerald"
                          ? "bg-emerald-50"
                          : "bg-amber-50"
                      }
                    `}
                  >
                    {section.icon}
                  </div>

                  <h2 className="text-xl font-semibold text-slate-900">
                    {section.title}
                  </h2>
                </div>

                <span
                  className={`
                    px-3 py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${
                      section.accent === "indigo"
                        ? "bg-indigo-50 text-indigo-600"
                        : section.accent === "violet"
                        ? "bg-violet-50 text-violet-600"
                        : section.accent === "emerald"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }
                  `}
                >
                  {section.items.length}
                </span>

              </div>

              {/* Items */}
              {section.items.length > 0 ? (
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item._id}
                      className={`
                        rounded-2xl
                        p-4
                        bg-slate-50
                        border
                        transition-all
                        duration-200
                        ${
                          section.accent === "indigo"
                            ? "border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/40"
                            : section.accent === "violet"
                            ? "border-slate-200 hover:border-violet-200 hover:bg-violet-50/40"
                            : section.accent === "emerald"
                            ? "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40"
                            : "border-slate-200 hover:border-amber-200 hover:bg-amber-50/40"
                        }
                      `}
                    >
                      <h3 className="text-slate-900 font-medium">
                        {item.title}
                      </h3>

                      {item.category && (
                        <p className="text-slate-500 text-sm mt-1">
                          {item.category}
                        </p>
                      )}

                      {item.status && (
                        <p className="text-slate-500 text-sm mt-1">
                          {item.status}
                        </p>
                      )}

                      {item.language && (
                        <p className="text-slate-500 text-sm mt-1">
                          {item.language}
                        </p>
                      )}

                      {item.type && (
                        <p className="text-slate-500 text-sm mt-1">
                          {item.type}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-slate-200 rounded-2xl">
                  <p className="text-slate-400 text-sm">
                    No {section.title.toLowerCase()} found.
                  </p>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* No Results */}
        {totalResults === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">

            <div className="text-4xl mb-4">
              🔍
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No results found
            </h2>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              We couldn't find anything matching{" "}
              <span className="font-medium text-slate-700">
                "{query}"
              </span>
              . Try searching with a different keyword.
            </p>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SearchPage;