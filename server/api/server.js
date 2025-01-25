/**
 * Express API server with MongoDB connection
 */
const express = require('express');
const cors = require('cors');
const dbClient = require('../utils/db');

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Ensure the database connection is established before running the API app
(async () => {
    // Wait for the db connection
    await dbClient.connect();
    app.listen(port, () => {
        console.log(`API is running on port ${port}`);
    });
})();