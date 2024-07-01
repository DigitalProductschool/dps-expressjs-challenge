import express, { Request, Response } from 'express'; 
import db from '../../src/services/db.service'; 
// import splite3 from 'sqlite3';



export const getAllProjects = (req: Request, res: Response) => {
    try {
        const projects = db.query('SELECT * FROM projects');
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProjectById = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        const project = db.query('SELECT * FROM projects WHERE id = @id', { id });
        if (project.length === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json(project[0]);
        }
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createProject = (req: Request, res: Response) => {
    try {
        const { id, name, description } = req.body;
        const result = db.run('INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)', {
            id,
            name,
            description,
        });
        res.status(201).json({ id: result.lastInsertRowid, name, description });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateProjectById = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = db.run('UPDATE projects SET name = @name, description = @description WHERE id = @id', {
            name,
            description,
            id,
        });
        if (result.changes === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ id, name, description });
        }
    } catch (error) {
        console.error('Error updating project by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteProjectById = (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = db.run('DELETE FROM projects WHERE id = @id', { id });
        if (result.changes === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ message: 'Project deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting project by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
