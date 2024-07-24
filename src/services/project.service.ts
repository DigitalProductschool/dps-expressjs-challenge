// ./src/services/project.service.ts, safe way to access CRUD operations for the project schema
import Database from 'better-sqlite3';
import { Project, NoProjectFoundError } from '../models/projectModel';
import db from './db.service';

export function getAllProjects() {
	try {
		const projects = db.query('SELECT * FROM projects') as Project[];
		return projects;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function getProjectById(id: string) {
	try {
		const project = db.query('SELECT * FROM projects WHERE id = @id', {
			id,
		}) as Project[];

		if (!project || project.length === 0) {
			throw new NoProjectFoundError();
		}
		return project[0];
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function getProjectByName(name: string) {
	try {
		const projects = db.query(
			'SELECT * FROM projects WHERE name LIKE %@name%',
			{ name },
		) as Project[];

		if (!projects || projects.length === 0) {
			throw new NoProjectFoundError();
		}
		return projects;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function updateProject(id: string, name?: string, description?: string) {
	if (!name && !description) {
		// NOTE: not an error that shoule be propogated to client as it's an internal service, should be covered in tests.
		throw new Error('No data to update');
	}

	try {
		let result: Database.RunResult;
		if (!description) {
			result = db.run('UPDATE projects SET name = @name WHERE id = @id', {
				id,
				name,
			});
		} else if (!name) {
			result = db.run(
				'UPDATE projects SET description = @description WHERE id = @id',
				{ id, description },
			);
		} else {
			result = db.run(
				'UPDATE projects SET name = @name, description = @description WHERE id = @id',
				{ id, name, description },
			);
		}
		if (result.changes === 0) {
			throw new NoProjectFoundError();
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function deleteProjectById(id: string) {
	try {
		const result = db.run('DELETE FROM projects WHERE id = @id', { id });
		if (result.changes === 0) {
			throw new NoProjectFoundError();
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}
