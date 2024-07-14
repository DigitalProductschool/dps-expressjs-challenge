// Import the Express module and its types for TypeScript support
import express, { Express } from 'express';

import projectRoutes from '../src/routes/project.routes';
import reportRoutes from '../src/routes/report.routes';


// Import the dotenv module to load environment variables from a .env file
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);

// app.listen(port, () => {
// 	console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
}
export default app;
