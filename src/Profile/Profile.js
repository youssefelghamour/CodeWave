import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import hero from '../assets/hero-bg.jpg';


export class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { user } = this.props;

    return (
        <div className={css(styles.profile)}>
            <img src={hero} alt="Profile image" className={css(styles.image)}/>
            <p style={{display: 'inline', margin: '0',}}><strong>{user.firstName} {user.lastName}</strong></p>
            <p style={{display: 'inline', margin: '0',}}>Student ID: <strong>{user.studentId}</strong></p>
            <p style={{display: 'inline', margin: '0',}}>Cohort: <strong>{user.cohort}</strong></p>
        </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

Profile.defaultProps = {
  user: {},
};

const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddin: '20px',
        marginTop: '35px',
    },

    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginBottom: '10px',
        boxShadow: '#00000070 2px 3px 11px',
    },
});

export const mapStateToProps = (state) => ({
  user: state.ui.get('user'),
});

export default connect(mapStateToProps)(Profile);