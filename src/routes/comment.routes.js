import express from 'express';
import verifyToken from '../utils/verifyToken.js';
import {
  addComment,
  getComments
} from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/issues/:id/comments', verifyToken, addComment);
router.get('/issues/:id/comments', verifyToken, getComments);

export default router;