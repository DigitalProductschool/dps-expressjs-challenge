import sqlite from 'better-sqlite3';
import path from 'path';

// Create sqlite database connection - accessing db.sqlite3 file in db class
const db = new sqlite(path.resolve('./db/db.sqlite3'), {
	fileMustExist: true,
});

interface Report {
	id: number;
	projectid: number;
	text: string;
}

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
// Create a new project
function createProject(id: number, name: string, description: string) {
	const sql = 'INSERT INTO projects (id, name, description) VALUES (?, ?, ?)';
	return run(sql, [id, name, description]);
}


// Function to get all projects
//Read (GET)
function getProjects() {
	const sql = 'SELECT * FROM projects';
	return query(sql);
}

// Function to get a project by ID
function getProjectById(id: number) {
	const sql = 'SELECT * FROM projects WHERE id = CAST(? AS INTEGER)';
	return query(sql, [id]);
}

// Function to update a project by ID
function updateProject(id: number, name: string, description: string) {
	const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = CAST(? AS INTEGER)';
	return run(sql, [name, description, id]);
}


// Function to delete a project by ID
// function deleteProject(id: number) {
// 	const sql = 'DELETE FROM projects WHERE id = CAST(? AS INTEGER)';
// 	return run(sql, [id]);
// }

// Function to delete a project by ID and its corresponding reports
function deleteProject(id: number) {
	const deleteReportsSql = 'DELETE FROM reports WHERE projectid = CAST(? AS INTEGER)';
	const deleteProjectSql = 'DELETE FROM projects WHERE id = CAST(? AS INTEGER)';
	// First, delete the corresponding reports
	run(deleteReportsSql, [id]);
	// Then, delete the project
	return run(deleteProjectSql, [id]);
}


//CRUD Functions for reports
// Function to create a new report
function createReport(id: number, projectId: number, text: string) {
	const sql = 'INSERT INTO reports (id, projectid, text) VALUES (CAST(? AS INTEGER), CAST(? AS INTEGER), ?)';
	return run(sql, [id, projectId, text]);
}
// Function to get reports by project ID
function getReportsByProjectId(projectId: number) {
	const sql = 'SELECT * FROM reports WHERE projectid = CAST(? AS INTEGER)';
	return query(sql, [projectId]);
}

// Function to get a report by ID
function getReportById(id: number) {
	const sql = 'SELECT * FROM reports WHERE id = CAST(? AS INTEGER)';
	return query(sql, [id]);
}

// Function to update a report by ID
function updateReport(id: number, text: string) {
	const sql = 'UPDATE reports SET text = ? WHERE id = CAST(? AS INTEGER)';
	return run(sql, [text, id]);
}

// Function to delete a report by ID
function deleteReport(id: number) {
	const sql = 'DELETE FROM reports WHERE id = CAST(? AS INTEGER)';
	return run(sql, [id]);
}

// Function to get reports where a specific word appears at least three times in the description
function getReportsWithRepeatedWords(word: string): Report[] {
	const sql = 'SELECT * FROM reports WHERE text LIKE ?';
	const reports = query(sql, [`%${word}%`]) as Report[];
	return reports.filter((report: Report) => {
		const wordCount = report.text.split(/\W+/).filter((w: string) => w.toLowerCase() === word.toLowerCase()).length;
		return wordCount >= 3;
	});
}



// Export the functions
export default {
	query,
	run,
	createProject,
	getProjects,
	getProjectById,
	updateProject,
	deleteProject,
	createReport,
	getReportsByProjectId,
	getReportById,
	updateReport,
	deleteReport,
	getReportsWithRepeatedWords
};
