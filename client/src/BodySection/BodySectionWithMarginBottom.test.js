import { mount, shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';


describe('<BodySectionWithMarginBottom />', () => {
    it('renders a BodySection component with correct props', () => {
        const wrapper = shallow(
            <BodySectionWithMarginBottom title="test title">
                <p>test children node</p>
            </BodySectionWithMarginBottom>
        );

        // Check if BodySection is rendered
        const bodySection = wrapper.find(BodySection);
        expect(bodySection.exists()).toBe(true);

        // Check if props are passed correctly
        expect(bodySection.prop('title')).toEqual('test title');
        expect(bodySection.prop('children').type).toBe('p');
        expect(bodySection.prop('children').props.children).toEqual('test children node');
    });
});