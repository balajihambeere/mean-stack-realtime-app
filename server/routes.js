'use strict';
import express from 'express';
import authRoutes from './modules/auth/auth-routes';
import projectRoutes from './modules/project/project-routes';
import taskRoutes from './modules/task/task-routes';
import profileRoutes from './modules/profile/profile-routes';
import statsRoutes from './modules/stats/stats-routes';

const routes = express.Router();

routes.use('/', authRoutes);

routes.use('/', profileRoutes);

routes.use('/', projectRoutes);

routes.use('/', taskRoutes);

routes.use('/', statsRoutes);

export default routes;