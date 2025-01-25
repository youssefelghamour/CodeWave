/**
 * Express API server with MongoDB connection
 */
const express = require('express');
const cors = require('cors');
const dbClient = require('../utils/db');
const routes = require('./routes/index');

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', routes);

// Ensure the database connection is established before running the API app
(async () => {
    // Wait for the db connection
    await dbClient.connect();
    app.listen(port, () => {
        console.log(`API is running on port ${port}`);
    });
})();