import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { getLatestNotification } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, login, loginRequest, logout } from '../actions/uiActionCreators';
import NotificationsContainer from '../Notifications/NotificationsContainer';
import News from '../News/News';
import Updates from '../News/Updates';
import NewsSectionGrid from '../News/NewsSectionGrid';
import Profile from '../Profile/Profile';
import MiddleButtons from '../MiddleButtons/MiddleButtons';
import { useNavigate } from 'react-router-dom';


// HOC to inject navigate into a class component since it only works with function components
// Define a function that wraps a class component and adds new functionality (in this case, navigation)
const withNavigate = (WrappedComponent) => { 
    return function WithNavigate(props) { 
        // 'useNavigate' hook provides navigation function, allowing us to redirect
        const navigate = useNavigate(); 

        // Return the wrapped component with all the original props and the new 'navigate' prop
        return <WrappedComponent {...props} navigate={navigate} />; 
    };
};

export class Home extends Component {

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    /* If the user is logged in as admin, and tries to visit the home page, we redirect them to the admin page */
    if (this.props.isLoggedIn && this.props.user?.email === "admin@email.com") {
      this.props.navigate("/admin");
    }
    window.addEventListener('keydown', this.handleKeyDown);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    /* Keeping this even if it's redundant:
       if the component unmounts without the key being pressed,
       the event listener won't be removed; so this to ensure it's removed
    */
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert("Logging you out");
      this.props.logOut;
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  };

  componentDidUpdate(prevProps) {
    /* When the user logged in is an admin, this redirects to the admin page when they submit the login form
      Otherwise, we stay on the home page and display the course list to the student
      */
    if (
      this.props.isLoggedIn &&
      this.props.user?.email === "admin@email.com"
    ) {
      this.props.navigate("/admin");
    }
  }

  render () {
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout, loginError } = this.props;

    return (
      <Fragment>
        <NotificationsContainer 
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
        />
        
        <div className="Home">
          <Header isHomePage={true}/>

          <div className={css(styles.body)} >
            { isLoggedIn ? (
                <Fragment>
                  <BodySection>
                    <Profile />
                  </BodySection>
                  <BodySectionWithMarginBottom subtitle="Course list">
                    <CourseList />
                  </BodySectionWithMarginBottom>
                </Fragment>
              ) : ( 
                <BodySectionWithMarginBottom heroSection={true}>
                  <Login logIn={loginRequest} loginError={loginError}/>
                </BodySectionWithMarginBottom>
              )
            }

            <BodySection>
              <MiddleButtons />
            </BodySection>

            <BodySection subtitle="News from the School">
              <NewsSectionGrid>
                <News />
                <Updates />
              </NewsSectionGrid>
            </BodySection>
          </div>

          <div className={css(styles.footer)} >
            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  loginRequest: PropTypes.func,
  logout: PropTypes.func,
  loginError: PropTypes.string,
};

Home.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  loginRequest: () => {},
  logout: () => {},
  loginError: "",
  user: {},
};

const listCourses = [
  { id: 1, name: "ES6",     credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React",   credit: 40 }
];

const styles = StyleSheet.create({
  body: {
    display: 'block',
    //margin: '15px',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '62vh',
    width: '100%',
    justifySelf: 'center',
  },

  footer: {
    /*
    position: 'absolute',
    bottom: 0,
    left: 0,*/
    width: '100%',
    textAlign: 'center',
    fontSize: '0.85rem',
    fontFamily: 'Poppins',
    fontWeight: 400,
    //borderTop: 'solid 3px #e0354b',
    //fontStyle: 'italic',
  },
});

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn'),
  loginError: state.ui.get('loginError'),
  displayDrawer: state.ui.get('isNotificationDrawerVisible'),
  user: state.ui?.get('user'), // get user from state to check if it's admin, navigate to admin panel
});

export const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  login,
  logout,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Home));