import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';


describe('<CourseListRow />', () => {
    it('renders one cell with colspan = 2 when textSecondCell does not exist', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Course Name" />);
        expect(wrapper.find('tr').children()).toHaveLength(1); // Check for one child
        expect(wrapper.find('th').prop('colSpan')).toBe('2'); // Check for colspan = 2
    });

    it('renders two cells when textSecondCell is present', () => {
        const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Course Name" textSecondCell="Credit" />);
        expect(wrapper.find('tr').children()).toHaveLength(2); // Check for two children
        expect(wrapper.find('th')).toHaveLength(2); // Check for two <th> elements
    });

    it('renders correctly two td elements within a tr element when isHeader is false', () => {
        const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Course Name" textSecondCell="Credit" />);
        expect(wrapper.find('tr').children()).toHaveLength(2); // Check for two children
        expect(wrapper.find('td')).toHaveLength(2); // Check for two <td> elements
    });
});