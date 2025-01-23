import { createSelector } from 'reselect';


export const filterTypeSelected = (state) => state.notifications.get('filter');
export const getNotifications = (state) => state.notifications.getIn(['notifications', 'messages']);
/*export const getUnreadNotifications = (state) => {
    // Get all notifications
    const notifications = state.notifications.getIn(['notifications', 'messages']);
    
    // Create a new object to store only the unread notifications
    const unreadNotifications = {};

    for (let key in notifications) {
        // If the notification is not read, add it to unreadNotifications
        if (!notifications[key].isRead) {
            unreadNotifications[key] = notifications[key];
        }
    }

    // Return the object with only unread notifications
    return unreadNotifications;
};*/

export const getUnreadNotificationsByType = createSelector(
    [filterTypeSelected, getNotifications],
    (filter, messages) => {
        if (filter === 'DEFAULT') {
            // Create a new object to store only the unread notifications
            const unreadNotifications = {};

            for (let key in messages) {
                // If the notification is not read, add it to unreadNotifications
                if (!messages[key].isRead) {
                    unreadNotifications[key] = messages[key];
                }
            }

            // Return the object with only unread notifications
            return unreadNotifications;
        } else if (filter === 'URGENT') {
            const unreadNotifications = {};

            for (let key in messages) {
                // If the notification is not read, add it to unreadNotifications
                if (!messages[key].isRead) {
                    unreadNotifications[key] = messages[key];
                }
            }

            const urgentUnreadNotifications = {};

            for (let key in unreadNotifications) {
                // If the notification is urgent, add it to urgentUnreadNotifications
                if (unreadNotifications[key].type === 'urgent') {
                    urgentUnreadNotifications[key] = unreadNotifications[key];
                }
            }

            // Return only unread urgent notifications
            return urgentUnreadNotifications;
        }
    }
);