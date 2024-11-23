import { Map } from 'immutable';
import { getCourses } from './courseSelector';


describe('courseSelector', () => {
    it('should return a List of courses', () => {
        const state = {
            courses: Map({
                1: { id: 1, name: 'Course 1' },
                2: { id: 2, name: 'Course 2' }
            })
        };

        const result = getCourses(state);

        // result is an IndexedSeq and we use toJS to convert it into a regular JS array
        expect(result.toJS()).toEqual([
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' }
        ]);
    });
});