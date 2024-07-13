import sqlite from 'better-sqlite3';
import path from 'path';

//create sqlite database connection- accessing db.sqlite3 file in db class
const db = new sqlite(path.resolve('./db/db.sqlite3'), {
	fileMustExist: true,
});


//function to execute a SQL query that returns results (SELECT)
//returns the result of the search
function query(
	sql: string,

	params?: { [key: string]: string | number | undefined },
) {
	// If parameters are provided, prepare and execute the query with parameters
	// otherwise execute the query without parameters.
	return params ? db.prepare(sql).all(params) : db.prepare(sql).all();
}

//function to modify the database (INSERT, UPDATE, DELETE)
//returns the # rows affected
function run(
	sql: string,
	params?: { [key: string]: string | number | undefined },
) {
	return params ? db.prepare(sql).run(params) : db.prepare(sql).run();
}


//CRUD FUNCTIONS//

//Create a new project
function createProject(name: string, description: string) {
	const sql = 'INSERT INTO projects (name, description) VALUES (?,?)';
	return run(sql,{name,description});
}



export default { query,
	run,
createProject};


