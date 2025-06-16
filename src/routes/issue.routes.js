import express from 'express';
import verifyToken from '../utils/verifyToken.js';
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
} from '../controllers/issue.controller.js';

const router = express.Router();

router.post('/', verifyToken, createIssue);
router.get('/', verifyToken, getIssues);
router.put('/:id', verifyToken, updateIssue);
router.delete('/:id', verifyToken, deleteIssue);

export default router;