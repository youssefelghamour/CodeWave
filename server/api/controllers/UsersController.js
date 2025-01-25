const dbClient = require('../../utils/db');


/**
 * UsersController class that handles user-related API endpoints
 */
class UsersController {
    /* GET /users: returns all the users from the usersCollection */
    async getUsers(req, res) {
        // Fetch all users (toArray because find() returns a cursor)
        const users = await dbClient.usersCollection.find().toArray();;
        return res.status(200).json(users);
    }
}


module.exports = new UsersController();