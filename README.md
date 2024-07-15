# DPS Backend Coding Challenge

## Overview

This repository contains a very basic web application based on Typescript and Express.js. Main application file is `index.ts`. Node and npm are required.

## Implemented Features

- **Projects**
    - Create a new project
    - Retrieve all projects
    - Retrieve a project by ID
    - Update a project by ID
    - Delete a project by ID

- **Reports**
    - Create a new report
    - Retrieve reports by project ID
    - Retrieve a report by ID
    - Update a report by ID
    - Delete a report by ID

- **Special Endpoint**
    - Retrieve all reports where a specific word appears at least three times


## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will develop a backend system for managing data about a company's projects and their associated reports. Each project may have multiple reports linked to it, though having reports is not mandatory. Start your implementation using the provided SQLite database([db/db.sqlite3](./db/db.sqlite3)).

Refer to the database schema provided for understanding the data structure 👇

![Database schema](images/database_schema.png)

NOTE: You can use ([db.service.ts](./src/services/db.service.ts)) to handle SQL queries to the database.

## Challenge Tasks

-   **Fork this project:** Start by forking this repository
-   **REST API Development:** Design and implement a RESTful API to create, read, update, and delete projects and their reports.
-   **Special API Endpoint:** Create an API endpoint that retrieves all reports where the same word appears at least three times.
-   **Optional:** Secure all API routes with a hardcoded authentication token ("Password123").
-   **Submission:** After completing the challenge, email us the URL of your GitHub repository.
-   **Further information:**
    -   If there is anything unclear regarding requirements, contact us by replying to our email.
    -   Use small commits, we want to see your progress towards the solution.
    -   Code clean and follow the best practices.

## Features

- **Projects**
    - Create a new project
    - Retrieve all projects
    - Retrieve a project by ID
    - Update a project by ID
    - Delete a project by ID

- **Reports**
    - Create a new report
    - Retrieve reports by project ID
    - Retrieve a report by ID
    - Update a report by ID
    - Delete a report by ID

- **Special Endpoint**
    - Retrieve all reports where a specific word appears at least three times

## Installation

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

\
Happy coding!


