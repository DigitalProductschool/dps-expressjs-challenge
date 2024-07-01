import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as projectsController from './Controller/projects.controller';
import * as reportsController from './Controller/reports.controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Project routes
app.get('/api/v1/projects', projectsController.getAllProjects);
app.get('/api/v1/projects/:id', projectsController.getProjectById);
app.post('/api/v1/projects', projectsController.createProject);
app.put('/api/v1/projects/:id', projectsController.updateProjectById);
app.delete('/api/v1/projects/:id', projectsController.deleteProjectById);

// Route to get reports where the same word appears at least three times
app.get(
	'/api/v1/reports/repeating-words',
	reportsController.getReportsWithRepeatedWords,
);

// Get all reports for a specific project
app.get(
	'/api/v1/projects/:projectId/reports',
	reportsController.getAllReportsForProject,
);
app.get('/api/v1/reports/:reportId', reportsController.getReportById);
app.post(
	'/api/v1/projects/:projectId/reports',
	reportsController.createReportForProject,
);
app.put('/api/v1/reports/:reportId', reportsController.updateReportById);
app.delete('/api/v1/reports/:reportId', reportsController.deleteReportById);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
