import { Router } from 'express';
import dbService from '../services/db.service';

const router = Router();

// Create a new report
router.post('/', (req, res) => {
	const { id, projectid, text } = req.body;
	const result = dbService.createReport(id, projectid, text);
	res.status(201).json(result);
});
// Export the router as the default export
export default router;