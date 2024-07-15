// Import the necessary modules for testing
import dbService from '../src/services/db.service';

// Before each test, reset the database to a clean state
beforeEach(() => {
	dbService.run('DELETE FROM reports');
});

// Test case for the createReport function
test('should create a new report', () => {
	const result = dbService.createReport(3, 1, 'New Report Text');
	expect(result.changes).toBe(1);

	const report = dbService.query('SELECT * FROM reports WHERE text = ?', ['New Report Text']);
	expect(report.length).toBe(1);
	expect(report[0]).toMatchObject({
		id: '3',
		text: 'New Report Text',
		projectid: '1'
	});
});

// Test case for the getReportsByProjectId function
test('should retrieve reports by project ID', () => {
	dbService.createReport(3, 1, 'Report Text 1');
	dbService.createReport(4, 1, 'Report Text 2');

	const reports = dbService.getReportsByProjectId(1);
	expect(reports.length).toBe(2);
	expect(reports).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ text: 'Report Text 1' }),
			expect.objectContaining({ text: 'Report Text 2' })
		])
	);
});

// Test case for the getReportById function
test('should retrieve a report by ID', () => {
	dbService.createReport(3, 1, 'Report Text');
	const report = dbService.query('SELECT * FROM reports WHERE text = ?', ['Report Text'])[0];

	const retrievedReport = dbService.getReportById(3);
	expect(retrievedReport).toEqual([
		expect.objectContaining({ id: '3', text: 'Report Text', projectid: '1' })
	]);
});

// Test case for the updateReport function
test('should update a report by ID', () => {
	// Create a report with known text to update it later
	dbService.createReport(3, 1, 'Initial Text');

	// Query the report by text to get the created report
	const [report] = dbService.query('SELECT * FROM reports WHERE text = ?', ['Initial Text']);


	// Call the updateReport function to update the report's text
	const result = dbService.updateReport(3, 'Updated Text');
	expect(result.changes).toBe(1);

	// Verify the report was updated by querying the actual database
	const updatedReport = dbService.getReportById(3);
	expect(updatedReport).toEqual([
		expect.objectContaining({ id: '3', text: 'Updated Text', projectid: '1' })
	]);
});


// Test case for the deleteReport function
test('should delete a report by ID', () => {
	// Create a report with known text to delete it later
	dbService.createReport(3, 1, 'Report to be deleted');

	// Query the report by text to get the created report
	const [report] = dbService.query('SELECT * FROM reports WHERE text = ?', ['Report to be deleted']);

	// Call the deleteReport function
	const result = dbService.deleteReport(3);
	expect(result.changes).toBe(1);

	// Verify the report was deleted by querying the actual database
	const deletedReport = dbService.getReportById(3);
	expect(deletedReport.length).toBe(0);
});

// Test case for getting reports with a repeated word in the description
test('should get reports with the word "pancake" appearing at least three times in the description', () => {
	// Create a report with the word "pancake" repeated at least three times
	dbService.createReport(3, 1, 'This pancake is the best pancake you will ever have, pancake lovers rejoice!');

	// Use the special function to get reports with the word "pancake" repeated at least three times
	const reports = dbService.getReportsWithRepeatedWords('pancake');

	// Verify that the report with the repeated word is returned
	expect(reports.length).toBeGreaterThan(0);
	expect(reports).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ text: 'This pancake is the best pancake you will ever have, pancake lovers rejoice!' })
		])
	);
});








// After all tests, restore the reports table to its original state
afterAll(() => {
	// Delete all entries in the reports table
	dbService.run('DELETE FROM reports');

	// Insert the original reports
	dbService.run('INSERT INTO reports (id, text, projectid) VALUES (CAST(? AS INTEGER), ?, CAST(? AS INTEGER))', [1, 'Dive into the Quantum Quiche Quest, where culinary arts meet quantum physics. This project explores the tantalizing effects of quantum principles on baking techniques, aiming to uncover the perfect quiche formula. By manipulating matter at the subatomic level, we strive to enhance flavor profiles and textures that defy conventional cooking wisdom. Join us as we entangle particles and palates in a daring dance of deliciousness, charting a course through unexplored culinary territories with scientific rigor and a pinch of fun.', 1]);
	dbService.run('INSERT INTO reports (id, text, projectid) VALUES (CAST(? AS INTEGER), ?, CAST(? AS INTEGER))', [2, 'Embark on the Quantum Quiche Expedition, where culinary innovation intersects with quantum physics. This project investigates the intriguing impact of quantum mechanics on baking methods, seeking to discover the ultimate quiche recipe. By altering matter at the subatomic scale, we aim to elevate flavors and textures beyond traditional culinary boundaries. Join us as we entwine particles and palates in a bold journey of gastronomic delight, navigating new culinary landscapes with scientific precision and a dash of whimsy.', 1]);
});