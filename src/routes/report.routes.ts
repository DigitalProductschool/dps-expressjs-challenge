import { Router } from 'express';
import dbService from '../services/db.service';

const router = Router();

// Create a new report
router.post('/', (req, res) => {
	const { id, projectid, text } = req.body;
	const result = dbService.createReport(id, projectid, text);
	res.status(201).json(result);
});

// Get reports by project ID route handler
router.get('/project/:projectid', (req, res) => {
	// Destructure projectid from the request params
	const { projectid } = req.params;
	// Use the database service to get reports by project ID
	const reports = dbService.getReportsByProjectId(Number(projectid));
	// Send the reports as JSON with a 200 OK status code
	res.status(200).json(reports);
});

// Get a report by ID route handler
router.get('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Use the database service to get a report by ID
	const report = dbService.getReportById(Number(id));
	// Send the report as JSON with a 200 OK status code
	res.status(200).json(report);
});

// Update a report by ID route handler
router.put('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Destructure text from the request body
	const { text } = req.body;
	// Use the database service to update a report by ID
	const result = dbService.updateReport(Number(id), text);
	// Send the result as JSON with a 200 OK status code
	res.status(200).json(result);
});

// Delete a report by ID route handler
router.delete('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Use the database service to delete a report by ID
	const result = dbService.deleteReport(Number(id));
	// Send the result as JSON with a 200 OK status code
	res.status(200).json(result);
});

// Special API endpoint to get reports where a specific word appears at least three times in the description
router.get('/special/reports-with-repeated-words/:word', (req, res) => {
	const { word } = req.params;
	const reports = dbService.getReportsWithRepeatedWords(word);
	res.status(200).json(reports);
});


// Export the router as the default export
export default router;