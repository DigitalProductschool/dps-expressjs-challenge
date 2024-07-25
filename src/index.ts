import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRouter from './routes/projectRoutes';
import reportRouter from './routes/reportRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/reports', reportRouter);
app.get('/', (req, res) => {
	res.send('Api Healthy');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
