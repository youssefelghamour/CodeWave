const express = require('express');
const path = require('path');
const UsersController = require('../controllers/UsersController');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'help.html'));
});


/* Users Routes */

// CREEATE a new user
router.post('/users', UsersController.createUser);

// GET all users
router.get('/users', UsersController.getUsers);

// GET a user by id
router.get('/users/:id', UsersController.getUserByID);

// UPDATE a user by id
router.put('/users/:id', UsersController.updateUser);

// DELETE a user by id
router.delete('/users/:id', UsersController.deleteUser);


module.exports = router;