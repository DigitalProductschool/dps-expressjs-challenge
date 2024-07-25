// ./src/routes/reportRoutes.ts, Routes to expose controller for report schema
import { Router } from 'express';
import { reportUpdateValidator } from '../models/reportModel';
import {
	createNewReport,
	deleteReportById,
	findReportById,
	getReportByProject,
	specialReport,
	updateExistingReport,
} from '../controllers/reportController';

const reportRouter = Router();

reportRouter.get('/special', specialReport);

reportRouter
	.route('/project/:projectId')
	.get(getReportByProject)
	.post(reportUpdateValidator, createNewReport); // Same validator will be used as it is just metadata

reportRouter
	.route('/:id')
	.get(findReportById)
	.delete(deleteReportById)
	.put(reportUpdateValidator, updateExistingReport);

export default reportRouter;
