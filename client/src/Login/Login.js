import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import hero from '../assets/hero-bg1.jpg';
import { MdError } from "react-icons/md";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    this.props.logIn(this.state.email, this.state.password);
    event.preventDefault();
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });

    if (event.target.value.length > 0 && this.state.password.length > 0) {
      this.setState({ enableSubmit: true });
    } else {
      this.setState({ enableSubmit: false });
    }
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value })

    if (event.target.value.length > 0 && this.state.email.length > 0) {
      this.setState({ enableSubmit: true });
    } else {
      this.setState({ enableSubmit: false });
    }
  }

  render () {
    return (
      <React.Fragment>
        <div className={css(styles.loginSection)}>

          <div className={css(styles.leftHeroContainer)}>
            <h2 className={css(styles.heroTitle)}>Learn, Grow, Succeed.</h2>
            <h3 className={css(styles.heroSubtitle)}>Log in to track your progress & scores!</h3>
            <button className={css(styles.heroButton)}>Make Your Way</button>
          </div>


          <div className={css(styles.loginContainer)}>
              <form className={css(styles.formContainer)} onSubmit={this.handleLoginSubmit}>
                <p className={css(styles.formTitle)}>Login</p>
                { this.props.loginError &&
                    <p className={css(styles.errorMessage)}>
                      <MdError className={css(styles.errorIcon)}/>
                      {this.props.loginError}
                    </p>
                }

                <input className={css(this.props.loginError && this.state.email ? styles.inputError : styles.input)}  type='email'    id='email'    name="email"    value={this.state.email}    onChange={this.handleChangeEmail}    placeholder="Email"/>

                <input className={css(this.props.loginError && this.state.password ? styles.inputError : styles.input)}  type='password' id='password' name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password"/>

                <input className={css(styles.button)} type='submit'   value='Sign In'    disabled={!this.state.enableSubmit}/>
              </form>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

const styles = StyleSheet.create({
  loginSection: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundImage: `linear-gradient(#000000bf, #000000bf), url(${hero})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: 'white',
    //borderRadius: '25px',
    minHeight: '80vh',

    '@media (max-width: 900px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  leftHeroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'start',
    alignSelf: 'center',
    margin: 0,
    justifyItems: 'start',
    padding: '60px 60px 60px 100px',
    width: '40%',

    '@media (max-width: 900px)': {
      padding: '60px 0',
      width: '70%',
    }
  },

  heroTitle: {
    fontSize: '3.5rem',
    letterSpacing: '-5px',
    margin: 0,
    lineHeight: '54px',

    '@media (max-width: 900px)': {
      textAlign: 'center',
      alignSelf: 'center',
    }
  },

  heroSubtitle: {
    fontSize: '2rem',
    margin: '0',
    color: 'transparent',
    fontWeight: '100',
    background: 'linear-gradient(to right, rgb(224 93 93), rgb(255 205 218)) text',
    WebkitBackgroundClip: 'text',

    '@media (max-width: 900px)': {
      textAlign: 'center',
    }
  },

  heroButton: {
    border: '1px solid #ffffff80',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '20px',
    fontSize: '0.8rem',
    padding: '9px 18px',
    margin: '10px 0',
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Poppins',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: 'black',
      border: '1px solid white',
    },

    '@media (max-width: 900px)': {
      alignSelf: 'center',
    }
  },

  loginContainer: {
    //margin: '3rem 2rem',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    textAlign: 'center',
    textAlign: '-webkit-center',
    //
    width: '50%',
    height: '100%',
    flex: '1',
    //backgroundColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },

  errorMessage: {
    color: '#e31c3f',
    margin: '0',
    fontSize: '13px',
  },

  errorIcon: {
    position: 'relative',
    verticalAlign: 'middle',
    right: '2%',
  },
    
  label: {
    margin: '8px 0',
    fontWeight: '600',
    fontSize: '15px',
  },
    
  input: {
    border: '1.5px solid #b7b7b754 !important',
    padding: '3px 15px',
    borderRadius: '20px',
    height: '30px',
    backgroundColor: '#d3d3d347',
    //backgroundColor: 'white',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '15px',

    '@media (max-width: 900px)': {
      margin: '6px 0',
      width: '88%',
    },
  },

  inputError: {
    border: '1.5px solid rgb(101 101 101 / 33%) !important',
    padding: '3px 15px',
    borderRadius: '20px',
    height: '30px',
    //backgroundColor: '#d3d3d347',
    backgroundColor: '#ffdce3',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '15px',

    '@media (max-width: 900px)': {
      margin: '6px 0',
      width: '88%',
    },
  },
    
  button: {
    borderRadius: '20px',
    padding: '3px 10px',
    background: 'linear-gradient(to right, #e64541, #f54e7a)',
    cursor: 'pointer',
    marginTop: '15px',
    height: '39px',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    fontFamily: 'Poppins, sans-serif',
    ':hover': {
      background: 'linear-gradient(to right, rgb(190 38 34), rgb(221 47 93))',
    },
    ':disabled': {
      //backgroundColor: '#ffffff',
      cursor: 'not-allowed',
      //opacity: '0.5',
      background: 'rgba(219, 219, 219, 0.477)',
      color: '#b1b1b1',
    },
    '@media (max-width: 900px)': {
      marginLeft: 0,
      width: '100%',
    },
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    boxShadow: '2px 2px 9px #0000001f',
    padding: '25px',
    borderRadius: '33px',
    //marginTop: '30px',
    backgroundColor: 'white',
    //
    height: 'max-content',
    boxSizing: 'border-box',
    justifyContent: 'center',
    
    '@media (max-width: 1080px)': {
      margin: 0,
      width: '70%',
    },

    '@media (max-width: 900px)': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      width: '70%',
      marginBottom: '70px',
    },

    '@media (max-width: 700px)': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      width: '80%',
      marginBottom: '60px',
    },
  },

  formTitle: {
    margin: '0',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'black',
  },
});

export default Login;