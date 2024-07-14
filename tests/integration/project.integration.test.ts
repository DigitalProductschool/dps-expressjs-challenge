import request from 'supertest';
import app from '../../src/index';

describe('Project Endpoints', () => {
	// Define a test case for creating a new project
	it('should create a new project', async () => {
		const res = await request(app)
			.post('/api/projects')
			.send({
				id: 4,
				name: 'Another Test Project',
				description: 'Another Test Description'
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body.changes).toEqual(1);

		// Verify the project was created by querying the actual database
		const project = await request(app).get('/api/projects/4');
		console.log(project.body); // Log the response body to see its contents
		expect(project.statusCode).toEqual(200);
		expect(project.body.length).toEqual(1);
		expect(project.body[0]).toHaveProperty('name', 'Another Test Project');
		expect(project.body[0]).toHaveProperty('description', 'Another Test Description');
	});

	// Define a test case for getting a project by ID
	it('should get a project by ID', async () => {
		const res = await request(app).get('/api/projects/1');
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(1);
		expect(res.body[0]).toHaveProperty('name','');
		expect(res.body[0]).toHaveProperty('description','');
	});
});
