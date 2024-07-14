// Import the necessary modules for testing
import dbService from '../src/services/db.service';

describe('Database Service', () => {
    // Test case for the createProject function
    test('should create a new project', () => {
        // Call the createProject function with test data
        const result = dbService.createProject('Test Project', 'Test Description');

        // Assert that the result indicates one row was changed (inserted)
        expect(result.changes).toBe(1);

        // Verify the project was created by querying the actual database
        const project = dbService.query('SELECT * FROM projects WHERE name = ?', ['Test Project']);
        expect(project.length).toBe(1);
        expect(project[0]).toMatchObject({
            name: 'Test Project',
            description: 'Test Description',
        });
    });
});
