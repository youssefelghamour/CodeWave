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


export class Home extends Component {

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
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
});

export const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);