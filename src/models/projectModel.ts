// ./src/models/projectModel.ts, model and validator for the project schema.
import { Request, Response, NextFunction } from 'express';

export interface Project {
	id: string;
	name: string;
	description: string;
}

// Validator for api controller for query requiring metadata (name, description)
export const projectUpdateValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { name, description } = req.body;

	if (!name && !description) {
		return res
			.status(400)
			.send(
				"Either the key 'name' or 'description' is required to update the project",
			);
	}

	const errors: string[] = [];

	if (typeof name !== 'string' || name.trim().length === 0) {
		errors.push("Key 'name' must be a non-empty string");
	}
	if (description && typeof description !== 'string') {
		errors.push("Key 'description' must be a string if provided");
	}

	if (errors.length > 0) {
		return res.status(400).send(errors);
	}

	next();
};

export class NoProjectFoundError extends Error {
	constructor() {
		super('No Project Found with the given ID');
		this.name = 'NoProjectFoundError';
	}
}
