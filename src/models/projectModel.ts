// ./src/models/projectModel.ts, model and validator for the project schema.
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export interface Project {
	id: string;
	name: string;
	description: string;
}

export const projectValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { name, description } = req.body;
	const errors: string[] = [];

	if (typeof name !== 'string' || name.trim().length === 0) {
		errors.push('Name must be a non-empty string');
	}
	if (description && typeof description !== 'string') {
		errors.push('Description must be a string if provided');
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};
