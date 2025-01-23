import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_LOADING_STATE, SET_TYPE_FILTER } from "../actions/notificationActionTypes";
import { Map } from 'immutable';
import { normalizedData, notificationsNormalizer } from "../schema/notifications";


export const initialStateNotification = Map({
    filter: "DEFAULT",
    notifications: {},
    loading: false,
});

export const notificationReducer = (state = initialStateNotification, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            const data = notificationsNormalizer(action.data);
            Object.keys(data.notifications).forEach(id => {
                data.notifications[id].isRead = false;
            });
            return state.mergeDeep({ notifications: data });
        case MARK_AS_READ:
            return state.setIn(['notifications', 'messages', action.index, 'isRead'], true);
        case SET_TYPE_FILTER:
            return state.set('filter', action.filter);
        case SET_LOADING_STATE:
            return state.set('loading', action.loading);
        default:
            return state;
    }
};


/*
FETCH_NOTIFICATIONS_SUCCESS action:
{
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: [
        {
            "id": "5debd76480edafc8af244228",
            "author": {
            "id": "5debd764a7c57c7839d722e9",
            "name": {
                "first": "Poole",
                "last": "Sanders"
            },
            "email": "poole.sanders@holberton.nz",
            "picture": "http://placehold.it/32x32",
            "age": 25
            },
            "context": {
            "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
            "isRead": true,
            "type": "urgent",
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
            }
        },
        ...
    ]
};

notificationsNormalizer(action.data) would look like this:
{
    users: {
      'userId1': { id: 'userId1', name: { first: 'FirstName1', last: 'LastName1' }, email: 'user1@example.com', picture: 'http://placehold.it/32x32', age: 25 },
      'userId2': { id: 'userId2', name: { first: 'FirstName2', last: 'LastName2' }, email: 'user2@example.com', picture: 'http://placehold.it/32x32', age: 30 },
      ...
    },
    messages: {
      'messageId1': { guid: 'guid1', isRead: true , type: 'urgent', value: 'This is the content of message 1.' },
      'messageId2': { guid: 'guid2', isRead: false, type: 'urgent', value: 'This is the content of message 2.' },
      ...
    },
    notifications: {
      'notificationId1': { id: 'notificationId1', author: 'userId1', context: 'messageId1' },
      'notificationId2': { id: 'notificationId2', author: 'userId2', context: 'messageId2' },
      ...
    },
}


The state after dispatching the action would look like this:
Map({
    filter: 'DEFAULT',
    notifications: {
        users: {
            '5debd764a7c57c7839d722e9': {
                id: '5debd764a7c57c7839d722e9',
                name: {
                first: 'Poole',
                last: 'Sanders'
                },
                email: 'poole.sanders@holberton.nz',
                picture: 'http://placehold.it/32x32',
                age: 25
            },
            ...
        },
        messages: {
            '2d8e40be-1c78-4de0-afc9-fcc147afd4d2': {
                guid: '2d8e40be-1c78-4de0-afc9-fcc147afd4d2',
                isRead: true,
                type: 'urgent',
                value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
            },
            ...
        },
        notifications: {
            '5debd76480edafc8af244228': {
                id: '5debd76480edafc8af244228',
                author: '5debd764a7c57c7839d722e9',
                context: '2d8e40be-1c78-4de0-afc9-fcc147afd4d2',
                isRead: false
            },
            ...
        }
    },
    loading: false
})




*************************
MARK_AS_READ action:
{
    type: MARK_AS_READ,
    index: 2
};




*************************
SET_TYPE_FILTER action:
{
    type: SET_TYPE_FILTER,
    filter: "URGENT"
};
*/