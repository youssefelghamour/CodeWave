import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SELECT_COURSE, UNSELECT_COURSE, GET_USERS } from "./uiActionTypes";


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

export const getUsers = (users) => ({
    type: GET_USERS,
    users: users,
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


export const fetchUsers = () => {
    return (dispatch) => {
        return fetch('http://localhost:5000/users')
            .then((res) => res.json())
            .then((users) => { dispatch(getUsers(users))})
            .catch((error) => dispatch(loginFailure("Network Error")));
    };
};


export const updateUser = (updatedUser) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => response.json())
        .then(data => console.log(`Updated user: ${JSON.stringify(data)}`))
        .catch(error => console.error('Error:', error));
    };
};


export const createUser = (newUser) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => console.log(`New user added: ${JSON.stringify(data)}`))
        .catch(error => console.error('Error:', error));
    };
};