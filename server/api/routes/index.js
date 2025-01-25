const express = require('express');
const UsersController = require('../controllers/UsersController')


const router = express.Router();

router.get('/', (req, res) => {
    res.send(`
        <h1>School Dashboard API</h1>
        <p>Available Routes:</p>
        <ul>
            <li><a href="/users">GET /users</a> - Retrieve all users</li>
        </ul>
    `);
});

/* Users Routes */
// GET all users
router.get('/users', UsersController.getUsers);


module.exports = router;