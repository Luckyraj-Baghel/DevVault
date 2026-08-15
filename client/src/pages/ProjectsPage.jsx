import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/projectModal";
import toast from "react-hot-toast";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();

      setProjects(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const response = await createProject(projectData);

      setProjects((prev) => [
        response.data,
        ...prev,
      ]);

      toast.success("Project created successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create project"
      );
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      const response = await updateProject(
        editingProject._id,
        projectData
      );

      setProjects((prev) =>
        prev.map((project) =>
          project._id === editingProject._id
            ? response.data
            : project
        )
      );

      setEditingProject(null);

      toast.success("Project updated successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update project"
      );
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) => project._id !== id
        )
      );

      toast.success("Project deleted successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete project"
      );
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-slate-600 text-lg font-medium">
            Loading projects...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="text-slate-600 mt-2">
              Manage and track your development projects.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="self-start sm:self-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            + New Project
          </button>
        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="bg-violet-50 border border-violet-100 rounded-3xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border border-violet-100 flex items-center justify-center text-2xl">
              📁
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No projects yet
            </h2>

            <p className="text-slate-600 mb-6">
              Start organizing your development projects by creating your first one.
            </p>

            <button
              onClick={openCreateModal}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              + Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={openEditModal}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
          initialData={editingProject}
          onSubmit={
            editingProject
              ? handleUpdateProject
              : handleCreateProject
          }
        />

      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;