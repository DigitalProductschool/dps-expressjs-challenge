// ./src/models/reportModel.ts, model and validator for the report schema.
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export interface Report {
	id: string;
	text: string;
	projectId: string;
}

export const reportValidator = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { text, projectid } = req.body;
	const errors: string[] = [];

	if (typeof text !== 'string' || text.trim().length === 0) {
		errors.push('Text must be a non-empty string');
	}
	if (typeof projectid !== 'string' || projectid.trim().length === 0) {
		errors.push('Project ID must be a non-empty string');
	}

	if (errors.length > 0) {
		return next(createError(400, errors.join(', ')));
	}

	next();
};
