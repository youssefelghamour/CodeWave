import { FETCH_UPDATES_SUCCESS } from "./updatesActionTypes";


export const setUpdates = (data) => ({
    type: FETCH_UPDATES_SUCCESS,
    data,
});

export const fetchUpdates = () => {
    return (dispatch) => {
        return fetch('http://localhost:5000/updates')
            .then((response) => response.json())
            .then((data)  => dispatch(setUpdates(data)))
            .catch((error) => {});
    }
};