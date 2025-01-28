const dbClient = require('../../utils/db');


/**
 * NotificationsController class that handles notification-related API endpoints
 */
class NotificationsController {
    /* CREATE /notifications: creates a new notification */
    async createNotification(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id
            if (!("id" in newData)) {
                return res.status(400).json({ error: `Missing id` });
            }

            // Check if a notification with this id already exists
            const existingNotificationById = await dbClient.notificationsCollection.findOne({ id: newData.id.toString() });
            if (existingNotificationById) {
                return res.status(400).json({ error: "Notification with this ID already exists" });
            }

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
        /* In case we're using mongodb's _id, we need to convert it to string and the field to id for Nomalizr
        const modifiedNotifications = notifications.map((notification) => {
            return {
                ...notification,
                uid: notification._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });*/
        return res.status(200).json(notifications);
    }

    
    /* GET /notifications/id: returns the notification with the id */
    async getNotificationByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = req.params.id;
        // Fetch the notification from the database
        const notification = await dbClient.notificationsCollection.findOne({ id: id});

        if (notification) {
            return res.status(200).json(notification);
        } else {
            return res.status(400).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }


    /* UPDATE /notifications/id: updates the notification with the id */
    async updateNotification(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = req.params.id;
        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the notification from the database
        const notification = await dbClient.notificationsCollection.findOne({ id: id});

        if (notification) {
            // Update the notification
            await dbClient.notificationsCollection.updateOne({ id: id}, { $set: updateData });
            // Fetch the updated notification
            const updatedNotification = await dbClient.notificationsCollection.findOne({ id: id });
            return res.status(200).json(updatedNotification);
        } else {
            return res.status(400).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }


    /* DELETE /notifications/id: deletes a user with the id */
    async deleteNotification(req, res) {
        const id = req.params.id;
        const notification = await dbClient.notificationsCollection.findOne({ id: id});

        if (notification) {
            await dbClient.notificationsCollection.deleteOne({ id: id});
            return res.status(200).json({ message: "Notification deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Notification with id: ${req.params.id}` });
        }
    }
}


module.exports = new NotificationsController();