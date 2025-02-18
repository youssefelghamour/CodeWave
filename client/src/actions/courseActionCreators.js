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


export const updateCourse = (updatedCourse) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/courses/${updatedCourse.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCourse),
        })
        .then(response => response.json())
        .then(data => console.log(`Updated course: ${JSON.stringify(data)}`))
        .catch(error => console.error('Error:', error));
    };
};


export const createCourse = (newCourse) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        })
        .then(response => response.json())
        .then(data => console.log(`New course added: ${JSON.stringify(data)}`))
        .catch(error => console.error('Error:', error));
    };
};


export const deleteCourse = (course) => {
    return (dispatch) => {
        return fetch(`http://localhost:5000/courses/${course.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    };
};