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
  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    features,
    status,
  } = updateData;

  const allowedUpdates = {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    features,
    status,
  };

  // Remove fields that were not provided
  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) {
      delete allowedUpdates[key];
    }
  });

  const project = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: userId,
    },
    allowedUpdates,
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