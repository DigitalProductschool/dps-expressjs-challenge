import {Router } from'express' ;
import dbService from '../services/db.service';

const router = Router();

//create new project
router.post('/',(req, res) => {
	const { name, description} = req.body;
	const result = dbService.createProject(name,description);
	res.status(201).json(result);
});
// Export the router as the default export
export default router;