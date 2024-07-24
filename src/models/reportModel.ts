// ./src/models/reportModel.ts, model and validator for the report schema.
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export interface Report {
	id: string;
	text: string;
	projectId: string;
}

// Validator for api controller for query requiring metadata (text)
export const reportUpdateValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { text } = req.body;

	if (!text) {
		return next(createError(400, 'Id is required'));
	}

	const errors: Error[] = [];

	if (typeof text !== 'string' || text.trim().length === 0) {
		errors.push(new Error('Name must be a non-empty string'));
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};

// Validator for api controller for query requiring id
export const reportIdValidator = (
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
		errors.push(new Error('id must be a non-empty string'));
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};

// Validator for api controller for query requiring projectId
export const reportProjectIdValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { projectId } = req.body;

	if (!projectId) {
		return next(createError(400, 'Id is required'));
	}

	const errors: Error[] = [];

	if (typeof projectId !== 'string' || projectId.trim().length === 0) {
		errors.push(new Error('ProjectId must be a non-empty string'));
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};

export class NoReportFoundError extends Error {
	constructor() {
		super('No Report Found with the given ID');
		this.name = 'NoReportFoundError';
	}
}
