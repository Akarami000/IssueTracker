import express from 'express';
import verifyToken from '../utils/verifyToken.js';
import {
  addComment,
  getComments
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/issues/:id/comments', authMiddleware, addComment);
router.get('/issues/:id/comments', authMiddleware, getComments);

export default router;