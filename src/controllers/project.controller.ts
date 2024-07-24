import { Request, Response } from 'express';
import db from '../services/db.service';

export const getProjects = async (req: Request, res: Response) => {
	const projects = db.query('SELECT * FROM projects;');
	res.json(projects);
};
