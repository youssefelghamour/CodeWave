const dbClient = require('../../utils/db');


/**
 * UsersController class that handles user-related API endpoints
 */
class UsersController {
    /* CREATE /users: creates a new user */
    async createUser(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id and email keys
            const fields = ["id", "email"];
            for (const field of fields) {
                if (!(field in newData)) {
                    return res.status(400).json({ error: `Missing: ${field}` });
                }
            }

            // Check if a user with this id already exists
            const existingUserById = await dbClient.usersCollection.findOne({ id: newData.id });
            if (existingUserById) {
                return res.status(400).json({ error: "User with this ID already exists" });
            }

            // Check if a user with this email already exists
            const existingUserByEmail = await dbClient.usersCollection.findOne({ email: newData.email });
            if (existingUserByEmail) {
                return res.status(400).json({ error: "User with this email already exists" });
            }

            // Create the new user
            const newUser = await dbClient.usersCollection.insertOne(newData);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(400).json({ error: "Failed creating a new User" });
        }
    }


    /* GET /users: returns all the users from the usersCollection */
    async getUsers(req, res) {
        // Fetch all users (toArray because find() returns a cursor)
        const users = await dbClient.usersCollection.find().toArray();
        return res.status(200).json(users);
    }


    /* GET /users/id: returns the user with the id */
    async getUserByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Fetch the user from the database
        const user = await dbClient.usersCollection.findOne({ id: id});

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ error: `No User with id: ${req.params.id}` });
        }
    }


    /* UPDATE /users/id: updates the user with the id */
    async updateUser(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the user from the database
        const user = await dbClient.usersCollection.findOne({ id: id});

        if (user) {
            // Update the user
            await dbClient.usersCollection.updateOne({ id: id}, { $set: updateData });
            // Fetch the updated user
            const updatedUser = await dbClient.usersCollection.findOne({ id: id });
            return res.status(200).json(updatedUser);
        } else {
            return res.status(400).json({ error: `No User with id: ${req.params.id}` });
        }
    }


    /* DELETE /users/id: deletes a user with the id */
    async deleteUser(req, res) {
        const id = Number(req.params.id);
        const user = await dbClient.usersCollection.findOne({ id: id});

        if (user) {
            await dbClient.usersCollection.deleteOne({ id: id});
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ error: `No User with id: ${req.params.id}` });
        }
    }
}


module.exports = new UsersController();