import { fetchCourses, selectCourse, unSelectCourse, setCourses } from './courseActionCreators';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';


describe('courseActionCreators', () => {
  it('correct output of selectCourse action creator', () => {
    expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
  });

  it('correct output of unSelectCourse action creator', () => {
    expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
  });

  it('should create an action to set courses', () => {
    const data = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' }
    ];
    
    const expectedAction = {
      type: FETCH_COURSE_SUCCESS,
      data
    };

    expect(setCourses(data)).toEqual(expectedAction);
  });

  it('fetchCourses action creator (async)', async () => {
    const dispatch = jest.fn();
    const mockData = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' }
    ];

    // Mock the fetch call correctly
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });

    // Call the action
    await fetchCourses()(dispatch);

    // Check if the correct action was dispatched
    expect(dispatch).toHaveBeenCalledWith(setCourses(mockData));
  });
});