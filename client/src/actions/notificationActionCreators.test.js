import { notificationReducer } from "../reducers/notificationReducer";
import { fetchNotifications, markAsAread, setLoadingState, setNotificationFilter, setNotifications } from "./notificationActionCreators";
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, NotificationTypeFilters, SET_LOADING_STATE, SET_TYPE_FILTER } from "./notificationActionTypes";
import { Map } from 'immutable';


describe('notificationActionCreators', () => {
    it('markAsAread action creator', () => {
        const result = {
            type: MARK_AS_READ,
            index: 1
        };
        expect(markAsAread(1)).toEqual(result);
    });

    it('setNotificationFilter action creator', () => {
        const result = {
            type: SET_TYPE_FILTER,
            filter: NotificationTypeFilters.DEFAULT,
        };
        expect(setNotificationFilter("DEFAULT")).toEqual(result);
    });

    it('setLoadingState action creator', () => {
        const result = {
            type: SET_LOADING_STATE,
            loading: true,
        };
        expect(setLoadingState(true)).toEqual(result);
    });

    it('setNotifications action creator', () => {
        const data = [
            { id: 1, type: 'default', value: 'Test notification' }
        ];
        const result = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            data,
        };
        expect(setNotifications(data)).toEqual(result);
    });

    it('fetchNotifications action creator (async)', async () => {
        const dispatch = jest.fn();
        const mockData = [
            { id: 1, type: 'default', value: 'Test notification' }
        ];

        // Mock API call for fetchNotifications
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        });

        // Call the action
        await fetchNotifications()(dispatch);

        // Check if the correct actions were dispatched
        expect(dispatch).toHaveBeenCalledWith(setLoadingState(true));  // Check loading state on
        expect(dispatch).toHaveBeenCalledWith(setNotifications(mockData));  // Check if notifications were set correctly
        expect(dispatch).toHaveBeenCalledWith(setLoadingState(false));  // Check loading state off
    });

    it('should handle SET_LOADING_STATE', () => {
        const initialState = Map({
            filter: "DEFAULT",
            loading: false,
            notifications: [],
        });
        
        const action = {
            type: SET_LOADING_STATE,
            loading: true,
        };

        const newState = notificationReducer(initialState, action);

        expect(newState.get('loading')).toBe(true);
    });
});