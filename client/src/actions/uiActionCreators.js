import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SELECT_COURSE, UNSELECT_COURSE } from "./uiActionTypes";


export const login = (user) => ({
    type: LOGIN,
    user: user,
});

export const boundLogin = (email, password) => dispatch(login(email, password));


export const logout = () => ({
    type: LOGOUT,
});

export const boundLogout = () => dispatch(logout());


export const displayNotificationDrawer = () => ({
    type: DISPLAY_NOTIFICATION_DRAWER,
});

export const boundDisplayNotificationDrawer = () => dispatch(displayNotificationDrawer());


export const hideNotificationDrawer = () => ({
    type: HIDE_NOTIFICATION_DRAWER,
});

export const boundHideNotificationDrawer = () => dispatch(hideNotificationDrawer());


export const selectCourse = (index) => ({
    type: SELECT_COURSE,
    index,
});


export const unSelectCourse = (index) => ({
    type: UNSELECT_COURSE,
    index,
});


export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});


export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error,
});


export const loginRequest = (email, password) => {
    return (dispatch) => {
        return fetch('http://localhost:5000/users')
            .then((res) => res.json())
            .then((users) => {
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    dispatch(login(user));
                    dispatch(loginSuccess());
                } else {
                    dispatch(loginFailure("Wrong Email or Password"));
                }
            })
            .catch((error) => dispatch(loginFailure("Network Error")));
    };
};