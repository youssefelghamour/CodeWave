const dbClient = require('../../utils/db');
const { ObjectId } = require('mongodb');


/**
 * UpdatesController class that handles updates-related API endpoints
 */
class UpdatesController {
    /* CREATE /updates: creates a new updates */
    async createUpdate(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Create the new updates
            const newUpdate = await dbClient.updatesCollection.insertOne(newData);
            return res.status(201).json(newUpdate);
        } catch (error) {
            return res.status(400).json({ error: "Failed creating a new Update" });
        }
    }


    /* GET /updates: returns all the updates from the updatesCollection */
    async getUpdates(req, res) {
        // Fetch all updates (toArray because find() returns a cursor)
        const updates = await dbClient.updatesCollection.find().toArray();
        const modifiedUpdates = updates.map((update) => {
            return {
                ...update,
                id: update._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });
        return res.status(200).json(modifiedUpdates);
    }


    /* GET /updates/id: returns the updates with the id */
    async getUpdateByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Fetch the updates from the database
        let update = await dbClient.updatesCollection.findOne({ _id: id});

        if (update) {
            update = {
                ...update,
                id: update._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(update);
        } else {
            return res.status(400).json({ error: `No Updates with id: ${req.params.id}` });
        }
    }


    /* UPDATE /updates/id: updates the update with the id */
    async updateUpdate(req, res) {
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
        // Fetch the updates from the database
        const update = await dbClient.updatesCollection.findOne({ _id: id});

        if (update) {
            // Update the updates
            await dbClient.updatesCollection.updateOne({ _id: id}, { $set: updateData });
            // Fetch the updated updates
            let updatedUpdate = await dbClient.updatesCollection.findOne({ _id: id });
            updatedUpdate = {
                ...updatedUpdate,
                id: updatedUpdate._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(updatedUpdate);
        } else {
            return res.status(400).json({ error: `No Update with id: ${req.params.id}` });
        }
    }


    /* DELETE /updates/id: deletes a updates with the id */
    async deleteUpdate(req, res) {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        id = new ObjectId(id);

        const update = await dbClient.updatesCollection.findOne({ _id: id});

        if (update) {
            await dbClient.updatesCollection.deleteOne({ _id: id});
            return res.status(200).json({ message: "Update deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Updates with id: ${req.params.id}` });
        }
    }
}


module.exports = new UpdatesController();