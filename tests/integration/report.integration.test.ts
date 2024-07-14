// Import supertest for making HTTP requests in tests
import request from 'supertest';
// Import the Express application to be tested
import app from '../../src/index';

// Describe a test suite for report routes
describe('Report Endpoints', () => {
	// Define a test case for creating a new report
	it('should create a new report', async () => {
		// Make a POST request to create a new report
		const res = await request(app)
			.post('/api/reports')
			.send({
				id: 3,
				projectid: 1,
				text: 'New Report Text'
			});
		// Expect the response status code to be 201 Created
		expect(res.statusCode).toEqual(201);
		// Expect the response body to indicate one row was inserted
		expect(res.body.changes).toEqual(1);
	});
});


