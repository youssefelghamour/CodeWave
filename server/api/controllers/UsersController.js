const dbClient = require('../../utils/db');
const { ObjectId } = require('mongodb');


/**
 * UsersController class that handles user-related API endpoints
 */
class UsersController {
    /* CREATE /users: creates a new user */
    async createUser(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id
            if (!("email" in newData)) {
                return res.status(400).json({ error: `Missing email` });
            }

            // Check if a user with this email already exists
            const existingUserByEmail = await dbClient.usersCollection.findOne({ email: newData.email });
            if (existingUserByEmail) {
                return res.status(400).json({ error: "User with this email already exists" });
            }

            // If the new user is created without courses list, initialize it to an empty list
            if (!("courses" in newData)) {
                newData["courses"] = [];
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
        // Using mongodb's _id, we need to convert it to string and the field to id for Nomalizr
        const modifiedUsers = users.map((user) => {
            return {
                ...user,
                id: user._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });

        // Update each course in the user's course list by replacing its id with the corresponding course's actual _id from the database
        for (const user of modifiedUsers) {
            if (user.email !== "admin@email.com") {
                for (let course of user.courses) {
                    // courses have unique names
                    let courseDb = await dbClient.coursesCollection.findOne({ name: course.name });
                    course.id = courseDb._id;
                }
            }
        }
        return res.status(200).json(modifiedUsers);
    }


    /* GET /users/id: returns the user with the id */
    async getUserByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Fetch the user from the database (convert the id to ObjectId for mongodb)
        let user = await dbClient.usersCollection.findOne({ _id: new ObjectId(id)});

        if (user) {
            user = {
                ...user,
                id: user._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };

            // admin user doesn't have courses
            if (user.email !== "admin@email.com") {
                // Update each course in the user's course list by replacing its id with the corresponding course's actual _id from the database
                for (let course of user.courses) {
                    // courses have unique names
                    let courseDb = await dbClient.coursesCollection.findOne({ name: course.name });
                    course.id = courseDb._id;
                }
            }

            return res.status(200).json(user);
        } else {
            return res.status(400).json({ error: `No User with id: ${req.params.id}` });
        }
    }


    /* UPDATE /users/id: updates the user with the id */
    async updateUser(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the user from the database
        const user = await dbClient.usersCollection.findOne({ _id: id});

        if (user) {
            // Update the user
            await dbClient.usersCollection.updateOne({ _id: id}, { $set: updateData });
            // Fetch the updated user
            let updatedUser = await dbClient.usersCollection.findOne({ _id: id });
            updatedUser = {
                ...updatedUser,
                id: updatedUser._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(updatedUser);
        } else {
            return res.status(400).json({ error: `No User with id: ${req.params.id}` });
        }
    }


    /* DELETE /users/id: deletes a user with the id */
    async deleteUser(req, res) {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        id = new ObjectId(id);
        
        const user = await dbClient.usersCollection.findOne({ _id: id});

        if (user) {
            await dbClient.usersCollection.deleteOne({ _id: id});
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ error: `No User with id: ${req.params.id}` });
        }
    }
}


module.exports = new UsersController();