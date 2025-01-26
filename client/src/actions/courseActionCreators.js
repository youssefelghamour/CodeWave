import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "./courseActionTypes";


export const selectCourse = (index) => ({
    type: SELECT_COURSE,
    index,
});

export const boundSelectCourse = (index) => (dispatch) => dispatch(selectCourse(index));


export const unSelectCourse = (index) => ({
    type: UNSELECT_COURSE,
    index,
});

export const boundUnSelectCourse = (index) => (dispatch) => dispatch(unSelectCourse(index));


export const setCourses = (data) => ({
    type: FETCH_COURSE_SUCCESS,
    data,
});


export const fetchCourses = () => {
    return (dispatch) => {
        // return fetch('http://localhost:8080/courses.json')
        return fetch('http://localhost:5000/courses')
            .then((response) => response.json())
            .then((data)  => dispatch(setCourses(data)))
            .catch((error) => {});
    }
};