import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_LOADING_STATE, SET_TYPE_FILTER } from "./notificationActionTypes";


export const markAsAread = (index) => ({
    type: MARK_AS_READ,
    index,
});

export const boundMarkAsAread = (index) => dispatch(markAsAread(index));


export const setNotificationFilter = (filter) => ({
    type: SET_TYPE_FILTER,
    filter,
});

export const boundSetNotificationFilter = (filter) => dispatch(setNotificationFilter(filter));


export const setLoadingState = (loading) => ({
    type: SET_LOADING_STATE,
    loading,
});


export const setNotifications = (data) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
});


export const fetchNotifications = () => {
    return (dispatch) => {
        dispatch(setLoadingState(true));
        // return fetch('http://localhost:8080/notifications.json')
        return fetch('http://localhost:5000/notifications')
            .then((response) => response.json())
            .then((data) => dispatch(setNotifications(data))) // Dispatch the fetched notifications
            .catch((error) => {})
            .finally(() => dispatch(setLoadingState(false))); // Set loading state to false after the data is fetched
    }
};


export const createNotification = (newNotification) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotification),
        })
        .then(response => response.json())
        .then(data => console.log(`New notification added: ${JSON.stringify(data)}`))
        .catch(error => console.error('Error:', error));
    };
};