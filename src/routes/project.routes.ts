import {Router } from'express' ;
import dbService from '../services/db.service';

const router = Router();

//create new project
router.post('/',(req, res) => {
	const { name, description} = req.body;
	const result = dbService.createProject(name,description);
	res.status(201).json(result);
});

// Get all projects route handler
router.get('/', (req, res) => {
	// Use the database service to get all projects
	const projects = dbService.getProjects();
	// Send the projects as JSON with a 200 OK status code
	res.status(200).json(projects);
});

// Get a project by ID route handler
router.get('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Use the database service to get a project by ID
	const project = dbService.getProjectById(Number(id));
	// Send the project as JSON with a 200 OK status code
	res.status(200).json(project);
});

// Update a project by ID route handler
router.put('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Destructure name and description from the request body
	const { name, description } = req.body;
	// Use the database service to update a project by ID
	const result = dbService.updateProject(Number(id), name, description);
	// Send the result as JSON with a 200 OK status code
	res.status(200).json(result);
});

// Delete a project by ID route handler
router.delete('/:id', (req, res) => {
	// Destructure id from the request params
	const { id } = req.params;
	// Use the database service to delete a project by ID
	const result = dbService.deleteProject(Number(id));
	// Send the result as JSON with a 200 OK status code
	res.status(200).json(result);
});


// Export the router as the default export
export default router;

