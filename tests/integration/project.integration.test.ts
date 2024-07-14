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

	//define a test case for updating the new project
	it('should update a project by ID', async () => {
		// Update the project with new details
		const res = await request(app)
			.put('/api/projects/4')
			.send({
				name: 'Updated Project Name',
				description: 'Updated Project Description'
			});

		// Verify the update was successful
		expect(res.statusCode).toEqual(200);
		expect(res.body.changes).toEqual(1);

		// Verify the project was updated by querying the actual database
		const updatedProject = await request(app).get('/api/projects/4');
		console.log(updatedProject.body); // Log the response body to see its contents
		expect(updatedProject.statusCode).toEqual(200);
		expect(updatedProject.body.length).toEqual(1);
		expect(updatedProject.body[0]).toHaveProperty('name', 'Updated Project Name');
		expect(updatedProject.body[0]).toHaveProperty('description', 'Updated Project Description');
	});

	//define a test case for deleting the newly added project
	// Test case for deleting a project by ID
	it('should delete a project by ID', async () => {
		// Delete the project with ID 4
		const res = await request(app)
			.delete('/api/projects/4');

		// Verify the deletion was successful
		expect(res.statusCode).toEqual(200);
		expect(res.body.changes).toEqual(1);

		// Verify the project was deleted by querying the actual database
		const deletedProject = await request(app).get('/api/projects/4');
		console.log(deletedProject.body); // Log the response body to see its contents
		expect(deletedProject.statusCode).toEqual(200);
		expect(deletedProject.body.length).toEqual(0);
	});

	// Define a test case for getting an existing project by ID
	it('should get a project by ID', async () => {
		const res = await request(app).get('/api/projects/1');
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(1);
		expect(res.body[0]).toHaveProperty('name');
		expect(res.body[0]).toHaveProperty('description');
	});

	// Test case for getting all projects
	it('should get all projects', async () => {
		const res = await request(app).get('/api/projects');
		console.log(res.body); // Log the response body to see its contents
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(3);
		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ id: '1', name: 'Quantum Quiche Quest', description: 'Quantum Quiche Quest is where culinary arts meet quantum physics.' }),
				expect.objectContaining({ id: '2', name: 'Robotic Dog Walker', description: 'Robotic Dog Walker is an advanced AI-driven companion that takes your dog for a walk.' }),
				expect.objectContaining({ id: '3', name: 'Galactic Gardening Gear', description: 'Galactic Gardening Gear is the future of agriculture.' }),
			])
		);
	});
});
