import express, { Express } from 'express';
import projectsRoute from './routes/projects.route';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/projects', projectsRoute);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
