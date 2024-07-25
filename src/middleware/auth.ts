// ./src/middleware/auth.ts, Middleware for authentication
import { NextFunction, Request, Response } from 'express';

const HARDCODED_TOKEN = 'Bearer Password123';

function authenticationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers.authorization;

	if (!token && token !== HARDCODED_TOKEN) {
		res.status(401).send('UNAUTHORIZED');
	}

	next();
}

export default authenticationMiddleware;
