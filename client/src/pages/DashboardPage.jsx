import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getDashboardStats } from "../services/dashboard.service";
import StatCard from "../components/dashboard/StatCard";
import SectionCard from "../components/dashboard/SectionCard";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentSnippets, setRecentSnippets] = useState([]);
  const [recentBookmarks, setRecentBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardStats();

        setStats(response.data.stats);
        setRecentNotes(response.data.recentNotes || []);
        setRecentProjects(response.data.recentProjects || []);
        setRecentSnippets(response.data.recentSnippets || []);
        setRecentBookmarks(response.data.recentBookmarks || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-slate-500 text-sm">
            Loading dashboard...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalResources =
    stats.totalNotes +
    stats.totalProjects +
    stats.totalSnippets +
    stats.totalBookmarks;

  const pinnedItems =
    stats.pinnedNotes +
    stats.favoriteSnippets +
    stats.favoriteBookmarks;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6 md:p-8 shadow-sm">

          <div className="relative z-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-indigo-600 mb-3">
                Developer Workspace
              </p>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Welcome back 👋
              </h1>

              <p className="text-slate-500 text-base md:text-lg mt-3">
                Your personal developer workspace is ready.
              </p>
            </div>

            <div className="flex gap-10 mt-8 flex-wrap">

              <div>
                <p className="text-slate-500 text-sm">
                  Total Resources
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {totalResources}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Pinned Items
                </p>

                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {pinnedItems}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatCard
            title="Notes"
            value={stats.totalNotes}
            subtitle={`${stats.pinnedNotes} pinned notes`}
            accent="bg-indigo-500"
          />

          <StatCard
            title="Projects"
            value={stats.totalProjects}
            subtitle={`${stats.inProgressProjects} in progress`}
            accent="bg-violet-500"
          />

          <StatCard
            title="Snippets"
            value={stats.totalSnippets}
            subtitle={`${stats.favoriteSnippets} favorites`}
            accent="bg-emerald-500"
          />

          <StatCard
            title="Bookmarks"
            value={stats.totalBookmarks}
            subtitle={`${stats.favoriteBookmarks} favorites`}
            accent="bg-amber-500"
          />

        </div>

        {/* Recent Resources */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Recent Notes */}
          <SectionCard
            title="Recent Notes"
            link="/notes"
            accent="indigo"
          >
            <div className="space-y-3">
              {recentNotes.length > 0 ? (
                recentNotes.map((note) => (
                  <div
                    key={note._id}
                    className="group bg-white/70 rounded-2xl p-4 border border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <h3 className="text-slate-900 font-medium">
                      {note.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {note.category || "General"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No notes found.
                </p>
              )}
            </div>
          </SectionCard>

          {/* Recent Projects */}
          <SectionCard
            title="Recent Projects"
            link="/projects"
            accent="violet"
          >
            <div className="space-y-3">
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="group bg-white/70 rounded-2xl p-4 border border-violet-100 hover:border-violet-200 hover:bg-violet-50 transition-all duration-200"
                  >
                    <h3 className="text-slate-900 font-medium">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {project.status}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No projects found.
                </p>
              )}
            </div>
          </SectionCard>

          {/* Recent Snippets */}
          <SectionCard
            title="Recent Snippets"
            link="/snippets"
            accent="emerald"
          >
            <div className="space-y-3">
              {recentSnippets.length > 0 ? (
                recentSnippets.map((snippet) => (
                  <div
                    key={snippet._id}
                    className="group bg-white/70 rounded-2xl p-4 border border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <h3 className="text-slate-900 font-medium">
                      {snippet.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {snippet.language}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No snippets found.
                </p>
              )}
            </div>
          </SectionCard>

          {/* Recent Bookmarks */}
          <SectionCard
            title="Recent Bookmarks"
            link="/bookmarks"
            accent="amber"
          >
            <div className="space-y-3">
              {recentBookmarks.length > 0 ? (
                recentBookmarks.map((bookmark) => (
                  <div
                    key={bookmark._id}
                    className="group bg-white/70 rounded-2xl p-4 border border-amber-100 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200"
                  >
                    <h3 className="text-slate-900 font-medium">
                      {bookmark.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {bookmark.type}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No bookmarks found.
                </p>
              )}
            </div>
          </SectionCard>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;