import React, { PureComponent } from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {FaBell} from 'react-icons/fa';


const buttonStyle = {
    background: 'none',
    border: 'none',
    marginRight: '0',
    marginLeft: 'auto',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
};

const iconStyle = {
    width: '25px',
};


class Notifications extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead, setNotificationFilter, fetchNotifications, filter } = this.props;

        return (
            <div className={css(styles.notificationsContainer)}>
                <div className={ !displayDrawer ? css(styles.menuItem) : css(styles.hide)} onClick={handleDisplayDrawer}>
                    <FaBell className={css(styles.bellIcon)}/>
                    { Object.keys(listNotifications).length > 0 ? (
                        <p className={css(styles.notificationsCounter)}>{Object.keys(listNotifications).length}</p>
                    ) : (null)}
                </div>
                

                { displayDrawer ? 
                    (<div className={css(styles.notifications)}>
                        <button aria-label='Close' style={buttonStyle} onClick={handleHideDrawer}>
                            <img src={closeIcon} style={iconStyle} alt='close'/>
                        </button>

                        {listNotifications && 
                            <>
                                <p className={css(styles.p)}>Notifications</p>
                                <div className={css(styles.filterContainer)}>
                                    <button className={css(filter === 'DEFAULT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => setNotificationFilter('DEFAULT')}>All</button>
                                    <button className={css(filter === 'URGENT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => setNotificationFilter('URGENT')}>Urgent</button>
                                </div>
                            </>
                        }

                        <ul className={css(styles.ul)}>
                            { listNotifications ? (
                                Object.values(listNotifications).map((notification) => (
                                    <NotificationItem
                                        id={ notification.guid }
                                        key={ notification.guid }
                                        type={ notification.type }
                                        value={ notification.value }
                                        html={ notification.html }
                                        markAsRead={ markNotificationAsRead }
                                    />
                                ))
                            ) : (
                                <NotificationItem
                                    id={ 0 }
                                    type="default"
                                    value="No new notification for now"
                                    markAsRead={ markNotificationAsRead }
                                />
                            )}
                        </ul>
                    </div>)
                    : (<></>)
                }
                
            </div>
        );
    }
}

Notifications.propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.object,
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
    markNotificationAsRead: PropTypes.func,
    fetchNotifications: PropTypes.func,
};

Notifications.defaultProps = {
    displayDrawer: false,
    listNotifications: {},
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
    markNotificationAsRead: () => {},
    fetchNotifications: () => {},
};

const opacityKeyframes = {
    'from': {
        opacity: 0.5,
    },

    'to': {
        opacity: 1,
    },
};

const translateKeyframes = {
    '0%': {
        transform: 'rotate(0deg)',
    },
    '25%': {
        transform: 'rotate(-10deg)',
    },
    '50%': {
        transform: 'rotate(10deg)',
    },
    '100%': {
        transform: 'rotate(0deg)',
    },
};

const styles = StyleSheet.create({
    notificationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        right: '2%',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        fontFamily: 'Poppins, sans-serif',
        margin: '18px 10px 0 0',
        top: '88%',
        '@media (max-width: 900px)': {
            right: 0,
        }
    },
    
    menuItem: {
        //marginBottom: '8px',
        float: 'right',
        /*backgroundColor: '#fff8f8',*/
        cursor: 'pointer',
        zIndex: '1',
        borderRadius: '50%',
        boxShadow: '2px 3px 7px #a7a6a6cc',
        padding: '10px 11px 4px',
        position: 'fixed',
        //backgroundColor: '#e1003c',
        zIndex: '1',
        backgroundColor: '#bebebe',

        ':hover': {
            animationName: [opacityKeyframes, translateKeyframes],
            animationDuration: '1s, 0.5s',
            animationIterationCount: '2',
        },

        '@media (max-width: 900px)': {
            marginRight: '12px',
        }
    },

    bellIcon: {
        color: 'white',
        width: '25px',
        height: '25px',
    },

    notificationsCounter: {
        position: 'absolute',
        bottom: '8%',
        right: '3%',
        zIndex: '1',
        color: 'white',
        //textShadow: '-1px -1px 0 #e1003c, 1px -1px 0 #e1003c, -1px 1px 0 #e1003c, 1px 1px 0 #e1003c',
        width: '14px',
    },

    hide: {
        display: 'none',
    },
    
    notifications: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        /*border: '1.6px dashed #e0354b',*/
        position: 'fixed',
        width: '25rem',
        padding: '1rem',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        boxShadow: '0 0 11px #cccccc',
        borderRadius: '10px',
        overflow: 'auto',
        maxHeight: '660px',
        background: 'white',
        fontFamily: 'Poppins, sans-serif',
        zIndex: '1',
        bottom: '2%',
        right: '2%',
        
        '@media (max-width: 900px)': {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: 'white',
            zIndex: '2',
            border: 'none',
            fontSize: '20px',
            padding: '25px 25px 0px',
            overflow: 'auto',
            minHeight: '100%',
        },
    },
    
    p: {
        fontSize: '1.2rem',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
        '@media (max-width: 900px)': {
            fontSize: '20px',
        },
    },

    ul: {
        listStyleType: 'none',
        padding: '0',
        '@media (max-width: 900px)': {
            padding: 0,
        },
    },

    filterContainer: {
        marginTop: '10px',
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        color: '#adadad',
    },

    filterButton: {
        width: 'fit-content',
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: '#d7d7d74d',
        cursor: 'pointer !important',
        borderRadius: '8px !important',
        padding: '5px 10px',
        marginRight: '5px',
        border: 'none',

        ':hover': {
            backgroundColor: '#0000001a',
        },
    },

    filterButtonSelected: {
        width: 'fit-content',
        textAlign: 'center',
        verticalAlign: 'middle',
        backgroundColor: 'black',
        cursor: 'pointer !important',
        borderRadius: '8px !important',
        padding: '5px 10px',
        marginRight: '5px',
        border: 'none',
        color: 'white',
    },

    /*
    filterUrgent: {
        padding: '3px 7px',
        marginRight: '5px',
        fontWeight: '800',
        color: '#e24744',
        marginLeft: '10px',
        ':hover': {
            backgroundColor: 'rgba(219, 219, 219, 0.477)',
        },
    },

    filterDefault: {
        padding: '3px 3px',
        ':hover': {
            backgroundColor: 'rgba(219, 219, 219, 0.477)',
        },
    },
    */
});

export default Notifications;