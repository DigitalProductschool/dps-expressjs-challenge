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
				text: 'Test Report'
			});
		// Expect the response status code to be 201 Created
		expect(res.statusCode).toEqual(201);
		// Expect the response body to indicate one row was inserted
		expect(res.body.changes).toEqual(1);
	});

	// Define a test case for getting a report by ID
	it('should get a report by ID', async () => {
		const res = await request(app).get('/api/reports/3');
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(1);
		expect(res.body[0]).toHaveProperty('id', '3');
		expect(res.body[0]).toHaveProperty('projectid', '1');
		expect(res.body[0]).toHaveProperty('text', 'Test Report');
	});

	// Define a test case for updating a report by ID
	it('should update a report by ID', async () => {
		const res = await request(app)
			.put('/api/reports/3')
			.send({
				text: 'Updated Report Text'
			});
		// Expect the response status code to be 200 OK
		expect(res.statusCode).toEqual(200);
		// Expect the response body to indicate one row was updated
		expect(res.body.changes).toEqual(1);

		// Verify the report was updated by querying the actual database
		const updatedReport = await request(app).get('/api/reports/3');
		console.log(updatedReport.body); // Log the response body to see its contents
		expect(updatedReport.statusCode).toEqual(200);
		expect(updatedReport.body.length).toEqual(1);
		expect(updatedReport.body[0]).toHaveProperty('text', 'Updated Report Text');
	});

	// Define a test case for deleting a report by ID
	it('should delete a report by ID', async () => {
		const res = await request(app).delete('/api/reports/3');
		// Expect the response status code to be 200 OK
		expect(res.statusCode).toEqual(200);
		// Expect the response body to indicate one row was deleted
		expect(res.body.changes).toEqual(1);

		// Verify the report was deleted by querying the actual database
		const deletedReport = await request(app).get('/api/reports/3');
		console.log(deletedReport.body); // Log the response body to see its contents
		expect(deletedReport.statusCode).toEqual(200);
		expect(deletedReport.body.length).toEqual(0);
	});

	// Finally define a test case for getting reports by project ID
	it('should get reports by project ID', async () => {
		const res = await request(app).get('/api/reports/project/1');
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0); // Ensure there is at least one report

	});

	// Define a test case for creating a new report
	it('should create a new report', async () => {
		const res = await request(app)
			.post('/api/reports')
			.send({
				id: 3,
				projectid: 1,
				text: 'Test Report with repeated words pancake pancake pancake'
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body.changes).toEqual(1);
	});

	// Define a test case for getting reports where a specific word appears at least three times in the description
	it('should get reports with the word "pancake" appearing at least three times in the description', async () => {
		const word = 'pancake';
		const res = await request(app).get(`/api/reports/special/reports-with-repeated-words/${word}`);
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		// Verify that the report with repeated words is returned
		expect(res.body.length).toBeGreaterThan(0);
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ text: 'Test Report with repeated words pancake pancake pancake' })
			])
		);
	});


	// delete pancakes
	it('should delete a report by ID', async () => {
		const res = await request(app).delete('/api/reports/3');
		// Expect the response status code to be 200 OK
		expect(res.statusCode).toEqual(200);
		// Expect the response body to indicate one row was deleted
		expect(res.body.changes).toEqual(1);

		// Verify the report was deleted by querying the actual database
		const deletedReport = await request(app).get('/api/reports/3');
		console.log(deletedReport.body); // Log the response body to see its contents
		expect(deletedReport.statusCode).toEqual(200);
		expect(deletedReport.body.length).toEqual(0);
	});



});


