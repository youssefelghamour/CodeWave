const dbClient = require('../../utils/db');


/**
 * UpdatesController class that handles updates-related API endpoints
 */
class UpdatesController {
    /* CREATE /updates: creates a new updates */
    async createUpdate(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id
            if (!("id" in newData)) {
                return res.status(400).json({ error: `Missing id` });
            }

            // Check if a updates with this id already exists
            const existingUpdateById = await dbClient.updatesCollection.findOne({ id: newData.id });
            if (existingUpdateById) {
                return res.status(400).json({ error: "Update with this ID already exists" });
            }

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
        return res.status(200).json(updates);
    }


    /* GET /updates/id: returns the updates with the id */
    async getUpdateByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Fetch the updates from the database
        const update = await dbClient.updatesCollection.findOne({ id: id});

        if (update) {
            return res.status(200).json(update);
        } else {
            return res.status(400).json({ error: `No Updates with id: ${req.params.id}` });
        }
    }


    /* UPDATE /updates/id: updates the update with the id */
    async updateUpdate(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the updates from the database
        const update = await dbClient.updatesCollection.findOne({ id: id});

        if (update) {
            // Update the updates
            await dbClient.updatesCollection.updateOne({ id: id}, { $set: updateData });
            // Fetch the updated updates
            const updatedUpdate = await dbClient.updatesCollection.findOne({ id: id });
            return res.status(200).json(updatedUpdate);
        } else {
            return res.status(400).json({ error: `No Update with id: ${req.params.id}` });
        }
    }


    /* DELETE /updates/id: deletes a updates with the id */
    async deleteUpdate(req, res) {
        const id = Number(req.params.id);
        const update = await dbClient.updatesCollection.findOne({ id: id});

        if (update) {
            await dbClient.updatesCollection.deleteOne({ id: id});
            return res.status(200).json({ message: "Updates deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Updates with id: ${req.params.id}` });
        }
    }
}


module.exports = new UpdatesController();