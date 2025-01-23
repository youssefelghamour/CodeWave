import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';


describe('<CourseList />', () => {
    it('it renders without crashing', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the 5 different rows', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper.find(CourseListRow)).toHaveLength(5);
    });

    it('renders correctly with an empty listCourses or no prop', () => {
        const wrapperWithEmptyArray = shallow(<CourseList listCourses={[]} />);
        const wrapperWithoutProp = shallow(<CourseList />);
        expect(wrapperWithEmptyArray.find(CourseListRow)).toHaveLength(1); // Expecting "No course available yet" message
        expect(wrapperWithoutProp.find(CourseListRow)).toHaveLength(1);
    });

    it('renders courses correctly when passed a list', () => {
        const courses = [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 }
        ];
        const wrapper = shallow(<CourseList listCourses={courses} />);
        expect(wrapper.find(CourseListRow)).toHaveLength(courses.length);
    });
});