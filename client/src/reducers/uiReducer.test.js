import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/uiActionTypes";
import { initialStateUi, uiReducer } from "./uiReducer";


describe('uiReducer', () => {
    it('returns the initial state when no action is passed', () => {
        expect(uiReducer(undefined, {})).toEqual(initialStateUi);
    });

    it('returns the initial state when the action SELECT_COURSE is passed', () => {
        const action = { type: 'SELECT_COURSE' };
        expect(uiReducer(undefined, action)).toEqual(initialStateUi);
    });

    it('returns the state with updated isNotificationDrawerVisible property when the action DISPLAY_NOTIFICATION_DRAWER is passed', () => {
        const action = { type: DISPLAY_NOTIFICATION_DRAWER };
        const result = initialStateUi.set('isNotificationDrawerVisible', true);
        expect(uiReducer(undefined, action)).toEqual(result);
    });

    it('returns the state with updated isNotificationDrawerVisible property when the action HIDE_NOTIFICATION_DRAWER is passed', () => {
        const action = { type: HIDE_NOTIFICATION_DRAWER };
        const result = initialStateUi.set('isNotificationDrawerVisible', false);
        expect(uiReducer(undefined, action)).toEqual(result);
    });

    it('returns the state with updated isUserLoggedIn when the action LOGIN_SUCCESS is passed', () => {
        const action = { type: LOGIN_SUCCESS };
        const result = initialStateUi.set('isUserLoggedIn', true);
        expect(uiReducer(undefined, action)).toEqual(result);
    });

    it('returns the state with updated isUserLoggedIn when the action LOGIN_FAILURE is passed', () => {
        const action = { type: LOGIN_FAILURE };
        const result = initialStateUi.set('isUserLoggedIn', false);
        expect(uiReducer(undefined, action)).toEqual(result);
    });

    it('returns the state with user data when the action LOGIN is passed', () => {
        const action = { type: LOGIN, user: { email: 'user@example.com', password: 'password' } };
        const result = initialStateUi.set('user', action.user);
        expect(uiReducer(undefined, action)).toEqual(result);
    });

    it('returns the state with user data cleared when the action LOGOUT is passed', () => {
        const action = { type: LOGOUT };
        const result = initialStateUi.set('isUserLoggedIn', false).set('user', null);
        expect(uiReducer(undefined, action)).toEqual(result);
    });
});