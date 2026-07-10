import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getDashboardStats } from "../services/dashboard.service";
import StatCard from "../components/dashboard/StatCard";
import SectionCard from "../components/dashboard/SectionCard";

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
        <div className="text-white text-xl">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              Welcome back 👋
            </h1>

            <p className="text-slate-400 text-lg">
              Your personal developer workspace is ready.
            </p>

            <div className="flex gap-10 mt-8 flex-wrap">
              <div>
                <p className="text-slate-500 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalNotes +
                    stats.totalProjects +
                    stats.totalSnippets +
                    stats.totalBookmarks}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Pinned Items</p>
                <p className="text-2xl font-bold text-white">
                  {stats.pinnedNotes +
                    stats.favoriteSnippets +
                    stats.favoriteBookmarks}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

        {/* Preview Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <SectionCard title="Recent Notes">
            <div className="space-y-3">
              {recentNotes.length > 0 ? (
                recentNotes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                  >
                    <h3 className="text-white font-medium">
                      {note.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {note.category || "General"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">
                  No notes found.
                </p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Recent Projects">
            <div className="space-y-3">
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                  >
                    <h3 className="text-white font-medium">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {project.status}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">
                  No projects found.
                </p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Recent Snippets">
            <div className="space-y-3">
              {recentSnippets.length > 0 ? (
                recentSnippets.map((snippet) => (
                  <div
                    key={snippet._id}
                    className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                  >
                    <h3 className="text-white font-medium">
                      {snippet.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {snippet.language}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">
                  No snippets found.
                </p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Recent Bookmarks">
            <div className="space-y-3">
              {recentBookmarks.length > 0 ? (
                recentBookmarks.map((bookmark) => (
                  <div
                    key={bookmark._id}
                    className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                  >
                    <h3 className="text-white font-medium">
                      {bookmark.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {bookmark.type}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">
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