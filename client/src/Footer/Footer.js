import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { connect } from 'react-redux';
import logo from '../assets/header-logo.png';
import { css, StyleSheet } from 'aphrodite';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export function Footer(props) {
  const { user } = props;
  
  return (
    <div>
      <div className={css(styles.footerNavContainer)}>
        <nav className={css(styles.footerNav)}>
          <div>
            <p className={css(styles.pNav)}>About Us</p>
            <p className={css(styles.pNav)}>Mission & Vision</p>
            <p className={css(styles.pNav)}>Leadership</p>
          </div>

          <div>
            <p className={css(styles.pNav)}>Apply Now</p>
            <p className={css(styles.pNav)}>Programs</p>
            <p className={css(styles.pNav)}>Tuition & Fees</p>
            <p className={css(styles.pNav)}>Scholarships</p>
          </div>

          <div>
            <p className={css(styles.pNav)}>Academic Calendar</p>
            <p className={css(styles.pNav)}>Library</p>
            <p className={css(styles.pNav)}>Student Portal</p>
            <p className={css(styles.pNav)}>Contact Us</p>
          </div>

          <div style={{fontSize: '2.1rem',}}>
            <FaSquareXTwitter />
            <FaFacebookSquare />
            <FaInstagramSquare />
            <FaLinkedin />
          </div>
        </nav>
      </div>
      
      <div className={css(styles.footerContainer)}>
        <div className={css(styles.logoContainer)}>
          <img className={css(styles.img)} src={logo} alt="Holberton logo" />
          <p>Holberton School</p>
        </div>

        <p>Copyright &copy; { getFullYear() }</p>
        <p>{ getFooterCopy(false) }</p>
        {/*
        { user && user.email && (
          <p><a href="#">Contact us</a></p>
        )}
        */}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  footerNavContainer: {
    background: 'linear-gradient(149deg, #e1003c 37%, #f100a5)',
    color: 'white',
    textAlign: 'start',
    padding: '12px',
  },

  footerNav: {
    display: 'flex',
    justifyContent: 'space-between',
    //alignItems: 'center',
    width: '75%',
    justifySelf: 'center',

    '@media (max-width: 900px)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '60%',
    },

    '@media (max-width: 600px)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '75%',
    },

    '@media (max-width: 500px)': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
  },

  pNav: {
    cursor: 'pointer',

    ':hover': {
      color: 'lightgrey',
    },
  },

  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    justifySelf: 'center',
    color: '#e1003c',

    '@media (max-width: 800px)': {
      width: '100%',
    },

    '@media (max-width: 500px)': {
      flexDirection: 'column',
    },
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    position: 'relative',
    width: '2rem',
    //left: '12%',
    padding: '12px',
    //borderRadius: '20px',
    transition: 'transform filter 0.3s ease',

    ':hover': {
      transform: 'scale(103%)',
      filter: 'hue-rotate(30deg)',
    },
  },
});

const mapStateToProps = (state) => ({
  user: state.ui.get('user'),
});

export default connect(mapStateToProps)(Footer);