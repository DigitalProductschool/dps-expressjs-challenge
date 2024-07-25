// ./src/routes/projectRoutes.ts, Routes to expose controller for project schema
import { Router } from 'express';
import {
	createNewProject,
	deleteProject,
	getProject,
	getProjects,
	updateExistingProject,
} from '../controllers/projectController';
import { projectUpdateValidator } from '../models/projectModel';
const projectRouter = Router();

projectRouter
	.route('/')
	.get(getProjects)
	.post(projectUpdateValidator, createNewProject); // Same validator works for both

projectRouter
	.route('/:id')
	.get(getProject)
	.delete(deleteProject)
	.put(projectUpdateValidator, updateExistingProject);

export default projectRouter;
