const dbClient = require('../../utils/db');
const { ObjectId } = require('mongodb');


/**
 * NotificationsController class that handles notification-related API endpoints
 */
class NotificationsController {
    /* CREATE /notifications: creates a new notification */
    async createNotification(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Create the new notification
            const newNotification = await dbClient.notificationsCollection.insertOne(newData);
            return res.status(201).json(newNotification);
        } catch (error) {
            return res.status(400).json({ error: "Failed creating a new Notification" });
        }
    }


    /* GET /notifications: returns all the notifications from the notificationsCollection */
    async getNotifications(req, res) {
        // Fetch all notifications (toArray because find() returns a cursor)
        const notifications = await dbClient.notificationsCollection.find().toArray();
        // Using mongodb's _id, we need to convert it to string and the field to id for Nomalizr
        const modifiedNotifications = notifications.map((notification) => {
            return {
                ...notification,
                id: notification._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });
        return res.status(200).json(modifiedNotifications);
    }

    
    /* GET /notifications/id: returns the notification with the id */
    async getNotificationByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Fetch the notification from the database
        let notification = await dbClient.notificationsCollection.findOne({ _id: id});

        if (notification) {
            notification = {
                ...notification,
                id: notification._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };

            return res.status(200).json(notification);
        } else {
            return res.status(400).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }


    /* UPDATE /notifications/id: updates the notification with the id */
    async updateNotification(req, res) {
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
        // Fetch the notification from the database
        const notification = await dbClient.notificationsCollection.findOne({ _id: id});

        if (notification) {
            // Update the notification
            await dbClient.notificationsCollection.updateOne({ _id: id}, { $set: updateData });
            // Fetch the updated notification
            const updatedNotification = await dbClient.notificationsCollection.findOne({ _id: id });
            updatedNotification = {
                ...updatedNotification,
                id: updatedNotification._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(updatedNotification);
        } else {
            return res.status(400).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }


    /* DELETE /notifications/id: deletes a user with the id */
    async deleteNotification(req, res) {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        id = new ObjectId(id);

        const notification = await dbClient.notificationsCollection.findOne({ _id: id});

        if (notification) {
            await dbClient.notificationsCollection.deleteOne({ _id: id});
            return res.status(200).json({ message: "Notification deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }
}


module.exports = new NotificationsController();