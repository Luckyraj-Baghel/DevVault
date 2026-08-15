import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getProfile } from "../services/profile.service";
import { getDashboardStats } from "../services/dashboard.service";
import { logoutUser } from "../services/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import EditProfileModal from "../components/profile/EditProfileModal";
import { updateProfile, changePassword } from "../services/auth.service";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const navigate = useNavigate();

  const {
    setUser: setAuthUser,
    checkAuth,
  } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    try {
      await logoutUser();

      setAuthUser(null);

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to logout"
      );
    }
  };

  const handleChangePassword = async (formData) => {
    try {
      const response = await changePassword(formData);

      toast.success(response.message);

      setIsChangePasswordOpen(false);

      setAuthUser(null);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const response = await updateProfile(profileData);

      setUser(response.data);

      await checkAuth();

      toast.success("Profile updated successfully");

      setShowEditModal(false);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await getProfile();
        const dashboardResponse = await getDashboardStats();

        setUser(profileResponse.data);
        setStats(dashboardResponse.data.stats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-slate-500 text-sm">
            Loading profile...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}
            <div className="h-24 w-24 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-indigo-600/20">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* User Information */}
            <div className="flex-1 min-w-0">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    {user?.name}
                  </h1>

                  <p className="text-slate-500 mt-1">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => setShowEditModal(true)}
                  className="
                    shrink-0
                    px-5 py-2.5
                    rounded-xl
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    text-sm
                    font-medium
                    shadow-sm
                    transition
                  "
                >
                  Edit Profile
                </button>

              </div>

              {user?.bio && (
                <p className="text-slate-600 mt-4 max-w-2xl">
                  {user.bio}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-4">

                {user?.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-sm
                      font-medium
                      text-indigo-600
                      hover:text-indigo-700
                      transition
                    "
                  >
                    GitHub ↗
                  </a>
                )}

                {user?.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-sm
                      font-medium
                      text-indigo-600
                      hover:text-indigo-700
                      transition
                    "
                  >
                    LinkedIn ↗
                  </a>
                )}

              </div>

              <p className="text-slate-400 text-xs mt-4">
                Member since{" "}
                {new Date(
                  user?.createdAt
                ).toLocaleDateString()}
              </p>

            </div>
          </div>
        </section>

        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="relative overflow-hidden bg-white border border-indigo-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />

            <p className="text-slate-500 text-sm font-medium mb-3">
              Notes
            </p>

            <h2 className="text-4xl font-bold text-slate-900">
              {stats.totalNotes}
            </h2>
          </div>

          <div className="relative overflow-hidden bg-white border border-violet-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-violet-500" />

            <p className="text-slate-500 text-sm font-medium mb-3">
              Projects
            </p>

            <h2 className="text-4xl font-bold text-slate-900">
              {stats.totalProjects}
            </h2>
          </div>

          <div className="relative overflow-hidden bg-white border border-emerald-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-emerald-500" />

            <p className="text-slate-500 text-sm font-medium mb-3">
              Snippets
            </p>

            <h2 className="text-4xl font-bold text-slate-900">
              {stats.totalSnippets}
            </h2>
          </div>

          <div className="relative overflow-hidden bg-white border border-amber-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-amber-500" />

            <p className="text-slate-500 text-sm font-medium mb-3">
              Bookmarks
            </p>

            <h2 className="text-4xl font-bold text-slate-900">
              {stats.totalBookmarks}
            </h2>
          </div>

        </div>

        {/* Account Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">

          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="
              px-6 py-3
              rounded-2xl
              border border-slate-200
              bg-white
              text-slate-700
              font-medium
              hover:bg-slate-50
              hover:border-slate-300
              shadow-sm
              transition
            "
          >
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="
              px-6 py-3
              rounded-2xl
              bg-red-600
              hover:bg-red-700
              text-white
              font-medium
              shadow-sm
              transition
            "
          >
            Logout
          </button>

        </div>

        {/* Modals */}
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() =>
            setIsChangePasswordOpen(false)
          }
          onSave={handleChangePassword}
        />

        <EditProfileModal
          isOpen={showEditModal}
          onClose={() =>
            setShowEditModal(false)
          }
          onSave={handleUpdateProfile}
          user={user}
        />

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;