import { Router } from 'express';
import { getProjects } from '../controllers/project.controller';

const router = Router();

router.get('/', getProjects);

export default router;
