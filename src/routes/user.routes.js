import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import verifyToken from '../utils/verifyToken.js';
const router = express.Router();

router.get('/',verifyToken, getUser);
router.put('/',verifyToken, updateUser);

export default router;