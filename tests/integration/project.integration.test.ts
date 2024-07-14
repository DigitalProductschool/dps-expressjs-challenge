import request from 'supertest';

// Import the Express application to be tested
import app from '../../src/index';


// Describe a test suite for project routes
describe('Project Endpoints', () => {
	// Define a test case for creating a new project
	it('should create a new project', async () => {
		// Make a POST request to create a new project
		const res = await request(app)
			.post('/api/projects')
			.send({
				name: 'Test Project',
				description: 'Test Description'
			});
		// Expect the response status code to be 201 Created
		expect(res.statusCode).toEqual(201);
		// Expect the response body to indicate one row was inserted
		expect(res.body.changes).toEqual(1);
	});


	// Define a test case for getting all projects
	it('should get all projects', async () => {
		const res = await request(app).get('/api/projects');
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});
});
