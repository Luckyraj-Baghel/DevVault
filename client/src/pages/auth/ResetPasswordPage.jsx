import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth.service";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { newPassword, confirmPassword } = formData;

  if (!newPassword || !confirmPassword) {
    toast.error("All fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    await resetPassword({
      token,
      newPassword,
      confirmPassword,
    });

    toast.success("Password reset successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to reset password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Reset Password
            </h1>

            <p className="text-slate-400 mt-2">
              Create a new password for your DevVault account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-500
                disabled:opacity-50
                text-white
                font-medium
                rounded-xl
                py-3
                transition
              "
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

          <button
            onClick={() => navigate("/login")}
            className="
              w-full
              mt-4
              text-sm
              text-slate-400
              hover:text-white
              transition
            "
          >
            Back to Login
          </button>

        </div>

      </div>
    </div>
  );
};

export default ResetPasswordPage;