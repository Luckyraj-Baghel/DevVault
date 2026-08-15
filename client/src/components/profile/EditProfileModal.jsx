import { useEffect, useState } from "react";

const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
      });
    }
  }, [user]);

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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">
            Edit Profile
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Update your profile information.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
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

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself..."
              rows={4}
              className="
                w-full
                resize-none
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

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              GitHub
            </label>

            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
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

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              LinkedIn
            </label>

            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
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
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;