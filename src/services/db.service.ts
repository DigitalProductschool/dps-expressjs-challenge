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
function createProject(name: string, description: string) {
	const sql = 'INSERT INTO projects (name, description) VALUES (?, ?)';
	return run(sql, [name, description]);
}

// Export the functions
export default {
	query,
	run,
	createProject,
};
