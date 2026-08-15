import { useState } from "react";

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">
            Change Password
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Update your account password securely.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-2.5
                rounded-xl
                border border-slate-200
                bg-white
                text-slate-700
                text-sm
                font-medium
                hover:bg-slate-50
                hover:border-slate-300
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-5 py-2.5
                rounded-xl
                bg-indigo-600
                text-white
                text-sm
                font-medium
                hover:bg-indigo-700
                shadow-sm
                transition
              "
            >
              Update Password
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;