import { shallow } from 'enzyme';
import { Header } from './Header';


describe('<Header />', () => {
    it('it renders without crashing', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders img and h1', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('h1')).toHaveLength(1);
    });
});