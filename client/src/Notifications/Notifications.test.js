import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';


describe('<Notifications />', () => {
    it('it renders without crashing', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the text Here is the list of notifications', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper.find('p').text()).toBe('Here is the list of notifications');
    });

    it('renders the NotificationItem componenet', () => {
        const wrapper = shallow(<Notifications />);
        expect(wrapper.find(NotificationItem)).to.have.lengthOf(3);
    });

    it('renders the NotificationItem componenet', () => {
        const wrapper = shallow(<Notifications />);
        const firstNotificationItem = wrapper.find(NotificationItem).at(0); // Get the first NotificationItem

        expect(firstNotificationItem.prop('type')).toBe('default'); // Check the type prop
        expect(firstNotificationItem.prop('value')).toBe('New course available'); // Check the value prop
        expect(firstNotificationItem.prop('html')).toBeUndefined(); // Check that html prop is undefined
    });

    it('displays the menu item when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect(wrapper.find('.menuItem').exists()).toBeTruthy();
    });

    it('does not display the div.Notifications when displayDrawer is false', () => {
        const wrapper = shallow(<Notifications displayDrawer={false} />);
        expect(wrapper.find('.Notifications').exists()).toBeFalsy();
    });

    it('displays the menu item when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect(wrapper.find('.menuItem').exists()).toBeTruthy();
    });

    it('displays the div.Notifications when displayDrawer is true', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} />);
        expect(wrapper.find('.Notifications').exists()).toBeTruthy();
    });

    it('renders correctly with an empty listNotifications or no prop', () => {
        const wrapperWithEmptyArray = shallow(<Notifications listNotifications={[]} />);
        const wrapperWithoutProp = shallow(<Notifications />);
        expect(wrapperWithEmptyArray.find(NotificationItem)).toHaveLength(1);
        expect(wrapperWithoutProp.find(NotificationItem)).toHaveLength(1);
    });

    it('renders notifications correctly when passed a list', () => {
        const notifications = [
            { id: 1, type: 'default', value: 'Notification 1' },
            { id: 2, type: 'urgent', html: { __html: 'Notification 2' } }
        ];
        const wrapper = shallow(<Notifications listNotifications={notifications} />);
        expect(wrapper.find(NotificationItem)).toHaveLength(notifications.length);
    });

    it('does not display "Here is the list of notifications" when listNotifications is empty', () => {
        const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} />);
        expect(wrapper.find('p').exists()).toBeFalsy();
        expect(wrapper.find(NotificationItem).prop('value')).toEqual('No new notification for now');
    });

    it('logs the "Notification id has been marked as read" with the right id', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        const wrapper = shallow(<Notifications />);

        // Call markAsRead with id=1 on an instance of the component
        wrapper.instance().markAsRead(1);

        expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
        consoleSpy.mockRestore();
    });

    const listNotifications = [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
    ];

    it('does not re-render with the same list', () => {
        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'shouldComponentUpdate');

        // Simulate changing the props of the Notifications component after it has already been rendered
        wrapper.setProps({ listNotifications });
        expect(instance.shouldComponentUpdate).toHaveBeenCalledTimes(1);
    });

    it('re-renders with a longer list', () => {
        const newListNotifications = [
            ...listNotifications,
            { id: 3, type: 'default', value: 'Another notification' },
        ];

        const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
        // Simulate changing the props of the Notifications component after it has already been rendered
        wrapper.setProps({ listNotifications: newListNotifications });
        expect(wrapper.find(NotificationItem).length).toBe(3);
    });

    it('calls handleDisplayDrawer on menu item click', () => {
        const handleDisplayDrawer = jest.fn();
        const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
        wrapper.find('.menuItem').simulate('click');
        expect(handleDisplayDrawer).toHaveBeenCalled();
      });
    
    it('calls handleHideDrawer on close button click', () => {
        const handleHideDrawer = jest.fn();
        const wrapper = shallow(<Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />);
        wrapper.find('.close-button').simulate('click');
        expect(handleHideDrawer).toHaveBeenCalled();
    });

    it('calls fetchNotifications when the component is mounted', () => {
        shallow(<Notifications />);
        // Check if fetchNotifications was called after mounting
        expect(fetchNotifications).toHaveBeenCalled();
    });

    it('should call setNotificationFilter with URGENT when first button is clicked', () => {
        const setNotificationFilter = jest.fn();
        const { getText } = render(<Notifications setNotificationFilter={setNotificationFilter} />);
    
        fireEvent.click(getText('!!'));
        expect(setNotificationFilter).toHaveBeenCalledWith('URGENT');
    });
    
    it('should call setNotificationFilter with DEFAULT when second button is clicked', () => {
        const setNotificationFilter = jest.fn();
        const { getText } = render(<Notifications setNotificationFilter={setNotificationFilter} />);
    
        fireEvent.click(getText('💠'));
        expect(setNotificationFilter).toHaveBeenCalledWith('DEFAULT');
    });
});