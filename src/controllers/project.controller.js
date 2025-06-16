import prisma from '../prisma/client.js';

export const createProject = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        ownerId
      }
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.query.user || req.user.id;

  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name }
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: `Project not found or update failed.${err}` });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: `Project not found or delete failed.: ${err}` });
  }
};