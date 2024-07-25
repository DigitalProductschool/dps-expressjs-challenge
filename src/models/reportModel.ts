// ./src/models/reportModel.ts, model and validator for the report schema.
import { Request, Response, NextFunction } from 'express';

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
		return res.status(400).send("Key 'text' is required");
	}

	if (typeof text !== 'string' || text.trim().length === 0) {
		return res.status(400).send("Key 'text' must be a non-empty string");
	}

	next();
};

export class NoReportFoundError extends Error {
	constructor() {
		super('No Report Found with the given ID');
		this.name = 'NoReportFoundError';
	}
}
