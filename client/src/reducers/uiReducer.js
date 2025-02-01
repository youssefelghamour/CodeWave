import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE, SELECT_COURSE, UNSELECT_COURSE } from "../actions/uiActionTypes";
import { Map } from 'immutable';
import { coursesNormalizer } from "../schema/courses";


export const initialStateUi = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
});

export const uiReducer = (state = initialStateUi, action) => {
    switch (action.type) {
        case DISPLAY_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', true);
        case HIDE_NOTIFICATION_DRAWER:
            return state.set('isNotificationDrawerVisible', false);
        case LOGIN_SUCCESS:
            return state.set('isUserLoggedIn', true).set('loginError', null);
        case LOGIN_FAILURE:
            console.log(action.error);
            return state.set('isUserLoggedIn', false).set('loginError', action.error);
        case LOGOUT:
            return state.set('isUserLoggedIn', false).set('user', null);
        case LOGIN:
            /* The normalizer nests the courses inside a `courses` object:
                        courses: {
                                courses: {
                                    '1': {...},
                                    '2': {...},
                                    ...
                The state then looks like this:
                        ui: {
                            ...
                            user: {
                                ...
                                courses: {
                                    courses: {
                                        '1': {...},
                                        '2': {...},
                                        ...
                so we're setting courses to normalizedData.courses, to end up with this:
                        ui: {
                            ...
                            user: {
                                ...
                                courses: {
                                    '1': {...},
                                    '2': {...},
                                    ...
                
                We normalize to turn courses list into an object with the keys being whatever the ids of the courses are
            */
            return state.set('user', {
                ...action.user,
                courses: action.user.courses ? coursesNormalizer(action.user.courses).courses : [], // admin user doesn't have courses 
            });
        case SELECT_COURSE:
            return state.setIn(['user', 'courses', String(action.index), 'isSelected'], true);
        case UNSELECT_COURSE:
            return state.setIn(['user', 'courses', String(action.index), 'isSelected'], false);
        default:
            return state;
    }
};