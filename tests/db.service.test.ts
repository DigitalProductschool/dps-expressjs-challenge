// Import the necessary modules for testing
import dbService from '../src/services/db.service';

describe('Database Service', () => {
    // Before each test, reset the database to a clean state
    beforeEach(() => {
        dbService.run('DELETE FROM projects');
    });

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

    // Test case for the getProjects function
    test('should retrieve all projects', () => {
        // Insert test projects into the database
        dbService.createProject('Test Project 1', 'Test Description 1');
        dbService.createProject('Test Project 2', 'Test Description 2');

        // Call the getProjects function
        const projects = dbService.getProjects();

        // Assert that the result contains the test projects
        expect(projects.length).toBe(2);
        expect(projects).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Test Project 1',
                    description: 'Test Description 1',
                }),
                expect.objectContaining({
                    name: 'Test Project 2',
                    description: 'Test Description 2',
                }),
            ])
        );
    });
});


// Test case for the getProjectById function
test('should retrieve a project by ID', () => {
    // Insert a test project into the database with a known ID
    const testId = 1.0;
    dbService.run('INSERT INTO projects (id, name, description) VALUES (?, ?, ?)', [testId, 'Test Project', 'Test Description']);

    // Call the getProjectById function
    const project = dbService.getProjectById(testId);

    // Assert that the retrieved project matches the inserted project
    expect(project).toEqual([
        expect.objectContaining({
            id: '1.0',
            name: 'Test Project',
            description: 'Test Description',
        })
    ]);
});
