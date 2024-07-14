import sqlite from 'better-sqlite3';
import path from 'path';

// Create sqlite database connection - accessing db.sqlite3 file in db class
const db = new sqlite(path.resolve('./db/db.sqlite3'), {
	fileMustExist: true,
});

// Function to execute a SQL query that returns results (SELECT)
function query(sql: string, params?: (string | number)[]) {
	return params ? db.prepare(sql).all(...params) : db.prepare(sql).all();
}

// Function to modify the database (INSERT, UPDATE, DELETE)
function run(sql: string, params?: (string | number)[]) {
	return params ? db.prepare(sql).run(...params) : db.prepare(sql).run();
}

// Create a new project
//Create(POST)
function createProject(name: string, description: string) {
	const sql = 'INSERT INTO projects (name, description) VALUES (?, ?)';
	return run(sql, [name, description]);
}

// Function to get all projects
//Read (GET)
function getProjects() {
	const sql = 'SELECT * FROM projects';
	return query(sql);
}

// Function to get a project by ID
//Read (GET)
function getProjectById(id: number) {
	const sql = 'SELECT * FROM projects WHERE id = ?';
	return query(sql, [id]);
}

// Function to update a project by ID
function updateProject(id: number, name: string, description: string) {
	const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
	return run(sql, [name, description, id]);
}

// Function to delete a project by ID
function deleteProject(id: number) {
	const sql = 'DELETE FROM projects WHERE id = ?';
	return run(sql, [id]);
}

// Export the functions
export default {
	query,
	run,
	createProject,
	getProjects,
	getProjectById,
	updateProject,
	deleteProject
};
