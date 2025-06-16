import prisma from '../prisma/client.js';

export const createIssue = async (req, res) => {
  const { title, description, status, projectId, assigneeId } = req.body;
  const createdBy = req.user.id;

  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        status,
        projectId,
        assigneeId,
        createdBy
      }
    });
    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIssues = async (req, res) => {
  const { projectId, assigneeId, status } = req.query;

  try {
    const issues = await prisma.issue.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(assigneeId && { assigneeId }),
        ...(status && { status })
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIssue = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assigneeId } = req.body;

  try {
    const issue = await prisma.issue.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(assigneeId && { assigneeId })
      }
    });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: 'Update failed or issue not found.' });
  }
};

export const deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.issue.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Delete failed or issue not found.' });
  }
};