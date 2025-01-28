import React, { Component } from 'react';
import logo from '../../dist/logo.png';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { logout } from '../actions/uiActionCreators';


export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    };
  }

  handleScroll = () => {
    // Checks if the vertical scroll position is greater than 50px
    this.setState({ scrolled: window.scrollY > 50 });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render () {
    const { user, logout, isHomePage, isLoggedIn } = this.props;

    /*
      -> When logged in:
              -> Same style for all pages:
                  - The header's position is sticky: at the top of the page (has its own space) but scrolls with you.
                  - The background color remains white.

      -> When the user is not logged in:
              -> On the home page:
                  - The header's position is fixed: stays on top of the hero/login (z axis, doesn't have its own space) section and scrolls with you.
                  - the style on scroll allows it to change on scroll: from transparent background to white.

              -> On any page other than the home page:
                  - The header's position is sticky: at the top of the page (has its own space) but scrolls with you.
                  - The background color remains white.
    */
    const headerClass = isLoggedIn ? styles.AppHeaderLoggedIn : (isHomePage ? styles.AppHeader : styles.AppHeaderArticlePage);

    /* Only the home page is concerned with the on scroll style change:
        - when you scroll down it changes from transparent backrgound to white
    */
    const headerStyle = isHomePage ?
        {
          backgroundColor: this.state.scrolled ? '#ffffffb3' : 'transparent',
          backdropFilter: this.state.scrolled ? 'blur(10px)' : '',
          boxShadow: this.state.scrolled ? '0 8px 16px #0003' : '',
          transition: 'background-color 0.55s ease',
        }
      : {};


    return (
      <div className={css(headerClass)} style={headerStyle}>
      
        <img className={css(styles.img)} src={logo} alt="logo" />

        
        <div className={css(styles.navContainer)}>
            {/* -> when not logged in, in the home page:
                      - on top, the header background color is transparent (black hero image) so the text color is white
                      - on scroll, the header background color becomes white so nav text color turns black
                -> when logged in or when it's not the home page, the background color of the headr is always white, so the text is black
            */}
            <a href="#" className={css(styles.nav)} style={{ color: this.state.scrolled || (isLoggedIn) || !isHomePage ? 'black' : 'white', transition: 'color 0.8s ease'}}>
                Home
            </a>

            <a href="#body" className={css(styles.nav)} style={{ color: this.state.scrolled || (isLoggedIn) || !isHomePage ? 'black' : 'white', transition: 'color 0.8s ease'}}>
                Courses
            </a>

            <a href="#news" className={css(styles.nav)} style={{ color: this.state.scrolled || (isLoggedIn) || !isHomePage ? 'black' : 'white', transition: 'color 0.8s ease'}}>
                News
            </a>

            <a href="#news" className={css(styles.nav)} style={{ color: this.state.scrolled || (isLoggedIn) || !isHomePage ? 'black' : 'white', transition: 'color 0.8s ease'}}>
                Updates
            </a>
            
        </div>
        

        { isLoggedIn ? (
            <div id="logoutSection" className={css(styles.logOut)}>
              <p style={{display: 'inline', margin: '0', color: 'grey'}}> {user.email}</p>
              <span onClick={logout} className={css(styles.logOutButton)}> logout</span>
            </div>
          ) : (
            <button className={css(styles.loginButton)} style={{ backgroundColor: this.state.scrolled || !isHomePage ? '#d2d2d2' : '#d2d2d238', transition: 'background-color 0.55s ease'}}>
              Login
            </button>
          )
        }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  AppHeaderLoggedIn: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0354b',
    /*borderBottom: '3px solid',*/
    width: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    paddingRight: '22px',
    fontFamily: 'Poppins, sans-serif',
    //background: 'linear-gradient(355deg, #e0354ba3 -118%, #00000000 67%)',
    backgroundColor: '#ffffffb3',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    boxShadow: '0 8px 16px #0003',
    position: 'sticky',
    top: '0',
    backdropFilter: 'blur(10px)',
    zIndex: '1',
  },

  AppHeader: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0354b',
    //borderBottom: '3px solid',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    //background: 'linear-gradient(355deg, #e0354ba3 -118%, #00000000 67%)',
    /*backgroundColor: '#ffffffb3',*/
    //borderBottomLeftRadius: '20px',
    //borderBottomRightRadius: '20px',
    /*boxShadow: '0 8px 16px #0003',*/
    position: 'fixed',
    top: '0',
    /*backdropFilter: 'blur(10px)',*/
    zIndex: '1',
  },

  AppHeaderArticlePage: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0354b',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#ffffffb3',
    boxShadow: '0 8px 16px #0003',
    top: '0',
    backdropFilter: 'blur(10px)',
    zIndex: '1',
    position: 'sticky',
  },

  img: {
    position: 'relative',
    width: '2.8rem',
    left: '12%',
    padding: '12px',
    borderRadius: '20px',
    transition: 'transform filter 0.3s ease',
    cursor: 'pointer',

    ':hover': {
      transform: 'scale(103%)',
      // filter: 'hue-rotate(30deg)',
      filter: 'brightness(1.5)',
    },
  },

  h1: {
    fontSize: '1.5rem',
    position: 'absolute',
    top: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    //background: 'linear-gradient(to right, #e31c3f, rgb(227, 97, 131))',
    WebkitBackgroundClip: 'text',
    //color: 'transparent',
    color: 'black',

    '@media (max-width: 600px)': {
      display: 'none',
    },
  },

  logOut: {
    marginLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    position: 'absolute',
    right: '12%',
  },

  logOutButton: {
    fontWeight: 'bold',
    cursor: 'pointer',
    
    ':hover': {
      transform: 'scale(110%)',
      color: '#a90318',
    },
  },

  navContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    //top: '40px',
    top: '33%',
    left: '50%',
    transform: 'translateX(-50%)',
    gap: '13px',

    '@media (max-width: 600px)': {
      display: 'none',
    },
  },

  nav: {
    //color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',

    ':hover': {
      color: 'darkgrey',
    },
  },

  loginButton: {
    position: 'absolute',
    right: '12%',
    padding: '8px 16px',
    border: 'none',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '25px',
    //backgroundColor: '#d2d2d2',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: 'grey',
    },
  },
});

const mapStateToProps = (state) => ({
  user: state.ui.get('user'),
  isLoggedIn: state.ui.get('isUserLoggedIn'),
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);