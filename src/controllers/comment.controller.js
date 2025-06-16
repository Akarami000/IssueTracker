import prisma from '../prisma/client.js';

export const addComment = async (req, res) => {
  const { id: issueId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        issueId,
        authorId
      }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const getComments = async (req, res) => {
  const { id: issueId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { issueId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};