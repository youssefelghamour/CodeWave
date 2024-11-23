import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from "../actions/courseActionTypes";
import { courseReducer } from "./courseReducer";
import { Map } from 'immutable';


describe('courseReducer', () => {
    const initialState = Map({
        1: { id: 1, name: "ES6",     credit: 60, isSelected: false },
        2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
        3: { id: 3, name: "React",   credit: 40, isSelected: false }
      });

    it('default state returns an empty array', () => {
        expect(courseReducer(undefined, {})).toEqual(Map([]));
    });

    it('FETCH_COURSE_SUCCESS returns the data passed', () => {
        const action = {
            type: FETCH_COURSE_SUCCESS,
            data: [
              { id: 1, name: "ES6",     credit: 60 },
              { id: 2, name: "Webpack", credit: 20 },
              { id: 3, name: "React",   credit: 40 }
            ]
        };
        expect(courseReducer(undefined, action)).toEqual(initialState);
    });

    it('SELECT_COURSE returns the data with the right item updated', () => {
        const action = {
            type: SELECT_COURSE,
            index: 2
        };
        const result = initialState.setIn([String(action.index), 'isSelected'], true);
        expect(courseReducer(initialState, action)).toEqual(result);
    });

    it('UNSELECT_COURSE returns the data with the right item updated', () => {
        const action = {
            type: UNSELECT_COURSE,
            index: 2
        };
        const result = initialState.setIn([String(action.index), 'isSelected'], false);
        expect(courseReducer(initialState, action)).toEqual(result);
    });
});