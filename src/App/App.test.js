import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { fromJS } from 'immutable';


describe('<App />', () => {
    it('contains the Notifications component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<Notifications />)).toBeTruthy();
    });

    it('contains the Header component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<Header />)).toBeTruthy();
    });

    it('contains the Login component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<Login />)).toBeTruthy();
    });

    it('contains the Footer component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<Footer />)).toBeTruthy();
    });

    it('CourseList is not displayed when not logged in', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<CourseList />)).toBeFalsy();
    });

    it('displays the alert Logging you out and calls the function logOut when ctrl+h is pressed', () => {
        // Mock the logOut function
        const logOutMock = jest.fn();
        // Mock window.alert
        window.alert = jest.fn();

        // Mount the App component
        const wrapper = shallow(<App logOut={ logOutMock } />);

        // Directly simulate pressing Ctrl+h event on the wrapper's instance
        wrapper.instance().handleKeyDown({ ctrlKey: true, key: 'h' });

        expect(window.alert).toHaveBeenCalledWith('Logging you out');
        expect(logOutMock).toHaveBeenCalled();

        // Clean up the alert mock
        window.alert.mockRestore();
    });

    it('default state of displayDrawer is false', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state('displayDrawer')).toBe(false);
      });
});


describe('<App isLoggedIn={ true } />', () => {
    it('does not contains the Login component', () => {
        const wrapper = shallow(<App isLoggedIn={ true } />);
        expect(wrapper.contains(<Login />)).toBeFalsy();
    });

    it('CourseList is included', () => {
        const wrapper = shallow(<App isLoggedIn={ true } />);
        expect(wrapper.contains(<CourseList />)).toBeTruthy();
    });
});

describe('mapStateToProps', () => {
    it('returns the right object', () => {
        let state = { ui: fromJS({ isUserLoggedIn: true, isNotificationDrawerVisible: true }) };
        expect(mapStateToProps(state)).toEqual({ isLoggedIn: true, displayDrawer: true });
    });
});