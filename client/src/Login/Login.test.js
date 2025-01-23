import { shallow } from 'enzyme';
import Login from './Login';


describe('<Login />', () => {
    it('it renders without crashing', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders 2 input tags and 2 label tags', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('input')).toHaveLength(2);
        expect(wrapper.find('label')).toHaveLength(2);
    });

    it('disables the submit button by default', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
      });
      
    it('enables the submit button after input changes', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@email.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password123' } });
        expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
    });
});