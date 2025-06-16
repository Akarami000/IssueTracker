import express, { json } from 'express';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import issueRoutes from './routes/issue.routes.js';
// import commentRoutes from './routes/comment.routes.js';

const app = express();

app.use(cors());
app.use(json());
app.use('/auth', authRoutes);
app.use('/me', userRoutes);
app.use('/projects', projectRoutes);
app.use('/issues', issueRoutes);
// app.use('/comments', commentRoutes);

export default app;