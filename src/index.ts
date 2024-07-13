// Import the Express module and its types for TypeScript support
import express, { Express } from 'express';

// Import the dotenv module to load environment variables from a .env file
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
