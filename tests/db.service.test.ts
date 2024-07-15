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
        const result = dbService.createProject(1,'Test Project', 'Test Description');

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
        dbService.createProject(1,'Test Project 1', 'Test Description 1');
        dbService.createProject(2,'Test Project 2', 'Test Description 2');

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


//Test case for the updateProject function
test('should update a project by ID', () => {
    // Insert a test project into the database with a known ID
    const testId = 5;
    dbService.run('INSERT INTO projects (id, name, description) VALUES (CAST(? AS INTEGER), ?, ?)', [testId, 'Initial Project', 'Initial Description']);


    // Call the updateProject function to update the project's name
    const result = dbService.updateProject(testId, 'testing123', 'Initial Description');

    // Assert that the result indicates one row was changed (updated)
    expect(result.changes).toBe(1);

    // Verify the project was updated by querying the actual database
    const updatedProject = dbService.getProjectById(testId);
    expect(updatedProject).toEqual([
        expect.objectContaining({
            id: '5',
            name: 'testing123',
            description: 'Initial Description',
        })
    ]);
});



//Test case for the deleteProject function
// Test case for the deleteProject function
test('should delete a project by ID and its corresponding reports', () => {
    // Insert a test project into the database with a known ID
    const testId = 6;
    dbService.run('INSERT INTO projects (id, name, description) VALUES (CAST(? AS INTEGER), ?, ?)', [testId, 'Test Project', 'Test Description']);

    // Insert corresponding reports for the project
    dbService.run('INSERT INTO reports (id, projectid, text) VALUES (CAST(? AS INTEGER), CAST(? AS INTEGER), ?)', [7, testId, 'Report Text 1']);
    dbService.run('INSERT INTO reports (id, projectid, text) VALUES (CAST(? AS INTEGER), CAST(? AS INTEGER), ?)', [8, testId, 'Report Text 2']);

    // Call the deleteProject function
    const result = dbService.deleteProject(testId);

    // Assert that the result indicates one row was changed (deleted)
    expect(result.changes).toBe(1);

    // Verify the project was deleted by querying the actual database
    const deletedProject = dbService.getProjectById(testId);
    expect(deletedProject.length).toBe(0);

    // Verify the corresponding reports were deleted by querying the actual database
    const deletedReports = dbService.getReportsByProjectId(testId);
    expect(deletedReports.length).toBe(0);
});


// After all tests, restore the projects table to its original state
afterAll(() => {
    // Delete all entries in the projects table
    dbService.run('DELETE FROM projects');

    // Insert the original projects with explicit integer IDs
    dbService.run('INSERT INTO projects (id, name, description) VALUES (CAST(? AS INTEGER), ?, ?)', [1, 'Quantum Quiche Quest', 'Quantum Quiche Quest is where culinary arts meet quantum physics.']);
    dbService.run('INSERT INTO projects (id, name, description) VALUES (CAST(? AS INTEGER), ?, ?)', [2, 'Robotic Dog Walker', 'Robotic Dog Walker is an advanced AI-driven companion that takes your dog for a walk.']);
    dbService.run('INSERT INTO projects (id, name, description) VALUES (CAST(? AS INTEGER), ?, ?)', [3, 'Galactic Gardening Gear', 'Galactic Gardening Gear is the future of agriculture.']);
});



