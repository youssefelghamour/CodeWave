import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "../actions/courseActionTypes";
import { Map } from 'immutable';
import { coursesNormalizer } from "../schema/courses";


export const courseReducer = (state = Map([]), action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      // Normalize the courses data
      let normalizedData = coursesNormalizer(action.data).courses;

      // Add isSelected: false for each course in normalizedData
      Object.keys(normalizedData).forEach((id) => {
        normalizedData[id].isSelected = false;
      });

      return state.merge(normalizedData);
    case SELECT_COURSE:
      return state.setIn([String(action.index), 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn([String(action.index), 'isSelected'], false);
    default:
      return state;
  }
};

/*
FETCH_COURSE_SUCCESS action: the API returning the list of courses
{
  type: FETCH_COURSE_SUCCESS,
  data: [
    { id: 1, name: "ES6",     credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React",   credit: 40 }
  ]
}

***normalizedData = 
  1: { id: 1, name: "ES6",     credit: 60 },
  2: { id: 2, name: "Webpack", credit: 20 },
  3: { id: 3, name: "React",   credit: 40 }
}

The state after calling FETCH_COURSE_SUCCESS would look like this:
Map({
  1: { id: 1, name: "ES6",     credit: 60, isSelected: false },
  2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
  3: { id: 3, name: "React",   credit: 40, isSelected: false }
})



SELECT_COURSE action: it sends an index corresponding to the id of the course to update, sets isSelected to true
{
  type: SELECT_COURSE,
  index: 2
}

UNSELECT_COURSE action: it sends an index corresponding to the id of the course to update, sets isSelected to false
{
  type: UNSELECT_COURSE,
  index: 2
}
*/