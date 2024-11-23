import { shallow } from 'enzyme';
import { Footer } from './Footer';


describe('<Footer />', () => {
    it('it renders without crashing', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders at the very least the text “Copyright”', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.text()).toContain('Copyright');
    });
});