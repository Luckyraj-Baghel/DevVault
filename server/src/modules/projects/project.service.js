import Project from "./project.model.js";

export const createProject = async (projectData, userId) => {
  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    features,
    status,
  } = projectData;

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const project = await Project.create({
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    features,
    status,
    owner: userId,
  });

  return project;
};

export const getAllProjects = async (userId) => {
  return await Project.find({ owner: userId }).sort({
    createdAt: -1,
  });
};

export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const updateProject = async (
  projectId,
  userId,
  updateData
) => {
  const project = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export const deleteProject = async (
  projectId,
  userId
) => {
  const project = await Project.findOneAndDelete({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};