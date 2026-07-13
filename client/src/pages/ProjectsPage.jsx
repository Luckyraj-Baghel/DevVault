import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
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
    };
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
      };
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
            <div className="text-white text-xl">
              Loading projects...
            </div>
          </DashboardLayout>
        );
      }

      return (
        <DashboardLayout>
          <div className="space-y-8">

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Projects
                </h1>

                <p className="text-slate-400 mt-2">
                  Manage and track your development projects.
                </p>
              </div>

              <button
                onClick={openCreateModal}
                className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-2xl text-white font-medium"
              >
                + New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
                <p className="text-slate-400">
                  No projects found.
                </p>
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