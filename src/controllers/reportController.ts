// ./src/controllers/reportController.ts, To handle request/response related to the report schema
import { Request, Response } from 'express';
import { InternalServerError } from './projectController';
import { NoReportFoundError } from '../models/reportModel';
import {
	createReport,
	deleteReport,
	getReportById,
	getReportsByProject,
	specialSearch,
	updateReport,
} from '../services/report.service';

export function getReportByProject(req: Request, res: Response) {
	const { projectId } = req.params;
	try {
		const reports = getReportsByProject(projectId);
		res.json(reports);
	} catch (error) {
		res.status(500).send(new InternalServerError());
	}
}

export function findReportById(req: Request, res: Response) {
	const { id } = req.params;

	if (id.trim().length === 0) {
		return res.status(400).json({ message: 'Id cannot be empty' });
	}

	try {
		const report = getReportById(id);
		res.send(report);
	} catch (error) {
		if (error instanceof NoReportFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
}

export function createNewReport(req: Request, res: Response) {
	const { projectId } = req.params;
	// NOTE: Input is already checked and sanitised by validator
	const { text } = req.body;

	try {
		const newReport = createReport(projectId, text);
		res.status(201).send(newReport);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}

export function updateExistingReport(req: Request, res: Response) {
	const { id } = req.params;
	const { text } = req.body;
	try {
		const report = updateReport(id, text);
		res.status(200).send(report);
	} catch (error) {
		if (error instanceof NoReportFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
}

export function deleteReportById(req: Request, res: Response) {
	const { id } = req.params;
	try {
		deleteReport(id);
		res.status(200).send('Deleted Successfully');
	} catch (error) {
		if (error instanceof NoReportFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
}

export function specialReport(req: Request, res: Response) {
	try {
		const reports = specialSearch();
		res.send(reports);
	} catch (error) {
		if (error instanceof NoReportFoundError) {
			res.status(404).send(error.message);
		} else {
			res.status(500).send(new InternalServerError());
		}
	}
}
