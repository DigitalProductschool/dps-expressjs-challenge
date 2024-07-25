// ./src/controllers/projectController.ts, To handle request/response related to the project schema
import { Request, Response } from 'express';
import {
	createProject,
	deleteProjectById,
	getAllProjects,
	getProjectById,
	updateProject,
} from '../services/project.service';
import { NoProjectFoundError } from '../models/projectModel';

export class InternalServerError extends Error {
	constructor() {
		super('INTERNAL SERVER ERROR OCCURED');
		this.name = 'InternalServerError';
	}
}

export function getProjects(req: Request, res: Response) {
	try {
		const projects = getAllProjects();
		res.json(projects);
	} catch (error) {
		res.status(500).send(new InternalServerError());
	}
}

export function getProject(req: Request, res: Response) {
	const id = req.params.id;

	if (id.trim().length === 0) {
		return res.status(400).json({ message: 'Id cannot be empty' });
	}

	try {
		const project = getProjectById(id);
		res.send(project);
	} catch (error) {
		if (error instanceof NoProjectFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
}

export function createNewProject(req: Request, res: Response) {
	// NOTE: Input is already checked and sanitised by validator
	const { name, description } = req.body;

	try {
		const newProject = createProject(name, description);
		res.status(201).send(newProject);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}

export const updateExistingProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;
	try {
		updateProject(id, name, description);
		res.status(200).send('Successfully Updated');
	} catch (error) {
		if (error instanceof NoProjectFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
};

export const deleteProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		deleteProjectById(id);
		res.status(200).send('Deleted Successfully');
	} catch (error) {
		if (error instanceof NoProjectFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
};
