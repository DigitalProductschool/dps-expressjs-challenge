// ./src/models/projectModel.ts, model and validator for the project schema.
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

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
		return next(createError(400, 'Either name or description required'));
	}

	const errors: Error[] = [];

	if (typeof name !== 'string' || name.trim().length === 0) {
		errors.push(new Error('Name must be a non-empty string'));
	}
	if (description && typeof description !== 'string') {
		errors.push(new Error('Description must be a string if provided'));
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};

// Validator for api controller for query requiring id
export const projectIdValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.body;

	if (!id) {
		return next(createError(400, 'Id is required'));
	}

	const errors: Error[] = [];

	if (typeof id !== 'string' || id.trim().length === 0) {
		errors.push(new Error('Name must be a non-empty string'));
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};

export class NoProjectFoundError extends Error {
	constructor() {
		super('No Project Found with the given ID');
		this.name = 'NoProjectFoundError';
	}
}
