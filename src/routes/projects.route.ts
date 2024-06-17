import express from 'express';
import projectController from '../controllers/projects.controller';

const router = express.Router();

/* GET projects */
router.get('/', projectController.get);

/* POST projects */
router.post('/', projectController.create);

/* PUT projects */
router.put('/:id', projectController.update);

/* DELETE projects */
router.delete('/:id', projectController.remove);

/* GET report summarisation */
router.get(
	'/:id/reports/:reportId/summary',
	projectController.getReportSummary,
);

export default router;
