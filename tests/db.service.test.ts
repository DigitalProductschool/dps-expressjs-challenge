// Import the sqlite library from 'better-sqlite3' for in-memory database interactions.
import sqlite from 'better-sqlite3';
// Import the database service module to be tested.
import dbService from '/Users/niaquinones/IdeaProjects/dps-expressjs-challenge/src/services/db.service';

// Create an in-memory SQLite database for testing.
const db = new sqlite(':memory:');

// Mock the dbService methods to use the in-memory database.
jest.mock('../src/services/db.service', () => {
    const originalModule = jest.requireActual('../src/services/db.service');
    return {
        ...originalModule,
        query: (sql: string, params?: { [key: string]: string | number | undefined }) => {
            return params ? db.prepare(sql).all(params) : db.prepare(sql).all();
        },
        run: (sql: string, params?: { [key: string]: string | number | undefined }) => {
            return params ? db.prepare(sql).run(params) : db.prepare(sql).run();
        },
    };
});
