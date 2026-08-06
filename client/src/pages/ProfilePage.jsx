import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getProfile } from "../services/profile.service";
import { getDashboardStats } from "../services/dashboard.service";
import { logoutUser } from "../services/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import EditProfileModal from "../components/profile/EditProfileModal";
import { updateProfile } from "../services/auth.service";
import { changePassword } from "../services/auth.service";
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

    const handleUpdateProfile = async (
        profileData
    ) => {
        try {
            const response =
                await updateProfile(profileData);

            setUser(response.data);

            await checkAuth();

            toast.success(
                "Profile updated successfully"
            );

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
                const dashboardResponse =
                    await getDashboardStats();

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
                <div className="text-white text-xl">
                    Loading profile...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">

                {/* Profile Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white">
                        {user?.name?.charAt(0)}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-white">
                            {user?.name}
                        </h1>

                        <p className="text-slate-400 mt-2">
                            {user?.email}
                        </p>

                        {user?.bio && (
                            <p className="text-slate-300 mt-3">
                                {user.bio}
                            </p>
                        )}

                        <div className="flex gap-5 mt-4">

                            {user?.github && (
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-400 hover:underline"
                                >
                                    GitHub
                                </a>
                            )}

                            {user?.linkedin && (
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-400 hover:underline"
                                >
                                    LinkedIn
                                </a>
                            )}

                        </div>

                        <p className="text-slate-500 mt-2 text-sm">
                            Member since{" "}
                            {new Date(
                                user?.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <button
                            onClick={() =>
                                setShowEditModal(true)
                            }
                            className="
                                mt-5
                                px-5
                                py-2
                                bg-indigo-600
                                hover:bg-indigo-500
                                rounded-xl
                                text-white
                                transition
                                "
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <p className="text-slate-400">Notes</p>
                        <h2 className="text-4xl text-white font-bold">
                            {stats.totalNotes}
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <p className="text-slate-400">Projects</p>
                        <h2 className="text-4xl text-white font-bold">
                            {stats.totalProjects}
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <p className="text-slate-400">Snippets</p>
                        <h2 className="text-4xl text-white font-bold">
                            {stats.totalSnippets}
                        </h2>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <p className="text-slate-400">Bookmarks</p>
                        <h2 className="text-4xl text-white font-bold">
                            {stats.totalBookmarks}
                        </h2>
                    </div>

                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() =>
                            setIsChangePasswordOpen(true)
                        }
                        className="
                          px-6 py-3
                          bg-indigo-600
                          hover:bg-indigo-700
                          text-white
                          rounded-2xl
                          transition
                          "
                    >
                        Change Password
                    </button>

                    <button
                        onClick={handleLogout}
                        className="
                          px-6 py-3
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          rounded-2xl
                          transition
                          "
                    >
                        Logout
                    </button>

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
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;