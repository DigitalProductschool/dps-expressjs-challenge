// ./src/services/report.service.ts, safe way to access CRUD operations for the report schema
import {
	Report as ReportModel,
	NoReportFoundError,
} from '../models/reportModel';
import { v4 as uuid } from 'uuid';
import db from './db.service';

export function getReportsByProject(projectId: string) {
	try {
		const reports = db.query(
			'SELECT * FROM projects WHERE id = @projectId',
			{ projectId },
		) as ReportModel[];
		return reports;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function createReport(projectId: string, text: string) {
	const id = uuid();

	try {
		db.run(
			'INSERT INTO reports (id, text, projectId) VALUES (@id, @text, @projectId)',
			{ id, text, projectId },
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function getReportById(id: string) {
	try {
		const report = db.query('SELECT * FROM reports WHERE id = @id', {
			id,
		}) as ReportModel[];

		if (!report || report.length === 0) {
			throw new NoReportFoundError();
		}
		return report[0];
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function updateReport(id: string, text: string) {
	try {
		const result = db.run(
			'UPDATE reports SET text = @text WHERE id = @id',
			{ text, id },
		);
		if (result.changes === 0) {
			throw new NoReportFoundError();
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function deleteReport(id: string) {
	try {
		const result = db.run('DELETE FROM reports WHERE id = @id', { id });
		if (result.changes === 0) {
			throw new NoReportFoundError();
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export function specialSearch() {
	try {
		const reports = db.query('SELECT * FROM reports') as ReportModel[];

		reports.filter((report) => {
			const wordCount = new Map<string, number>();
			const words = report.text.split('');

			words.forEach((word) => {
				if (wordCount.has(word)) {
					const currentCount = wordCount.get(word) ?? 0;
					wordCount.set(word, currentCount + 1);
				} else {
					wordCount.set(word, 1);
				}
			});

			wordCount.forEach((val) => {
				if (val >= 3) return true;
			});

			return false;
		});

		if (reports.length == 0) {
			throw new NoReportFoundError();
		}

		return reports;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
