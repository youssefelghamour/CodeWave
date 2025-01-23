import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from "../actions/notificationActionTypes";
import { notificationReducer } from "./notificationReducer";
import { Map } from 'immutable';


describe('notificationReducer', () => {
    const initialState = Map({
        filter: "DEFAULT",
        notifications: {
            users: {
                1: { id: '1' },
                2: { id: '2' },
                3: { id: '3' },
            }, // No need to include the whole author/users objects for these tests
            messages: {
                1: { guid: '1', type: 'default', value: 'text 1', isRead: true },
                2: { guid: '2', type: 'urgent',  value: 'text 2', isRead: false },
                3: { guid: '3', type: 'default', value: 'text 3', isRead: false },
            },
            notifications: {
                1: { id: '1', author: '1', context: '1', isRead: false },
                2: { id: '2', author: '2', context: '2', isRead: false },
                3: { id: '3', author: '3', context: '3', isRead: false },
            },
        },
        loading: false,
    });

    it('default state returns the initial state', () => {
        expect(notificationReducer(undefined, {})).toEqual(Map({
            filter: "DEFAULT",
            notifications: {},
            loading: false,
        }));
    });

    it('FETCH_NOTIFICATIONS_SUCCESS returns the data passed with isRead set to false', () => {
        const action = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data: [
                {
                    "id": "1",
                    "author": {
                        "id": "1"
                    },
                    "context": {
                      "guid": "1",
                      "isRead": true,
                      "type": "default",
                      "value": "text 1"
                    }
                },
                {
                    "id": "2",
                    "author": {
                        "id": "2"
                    },
                    "context": {
                      "guid": "2",
                      "isRead": false,
                      "type": "urgent",
                      "value": "text 2"
                    }
                },
                {
                    "id": "3",
                    "author": {
                        "id": "3"
                    },
                    "context": {
                      "guid": "3",
                      "isRead": false,
                      "type": "default",
                      "value": "text 3"
                    }
                }
            ]
        };
        expect(notificationReducer(undefined, action)).toEqual(initialState);
    });

    it('MARK_AS_READ updates the specified notification to isRead true', () => {
        const action = {
            type: MARK_AS_READ,
            index: 2
        };
        const expectedState = initialState.setIn(['notifications', 'messages', String(action.index), 'isRead'], true);
        expect(notificationReducer(initialState, action)).toEqual(expectedState);
    });

    it('SET_TYPE_FILTER updates the filter in the state', () => {
        const action = {
            type: SET_TYPE_FILTER,
            filter: "URGENT"
        };
        const expectedState = initialState.set('filter', action.filter);
        expect(notificationReducer(initialState, action)).toEqual(expectedState);
    });
});