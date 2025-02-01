import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from "../selectors/notificationSelector";
import Notifications from "../Notifications/Notifications";
import { setNotificationFilter } from "../actions/notificationActionCreators";
import NotificationItem from "../Notifications/NotificationItem";



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


class Admin extends Component {
    // Control Access: redirect to the Home page, if the user isn't logged in as admin
    componentDidMount() {
        if (!this.props.isLoggedIn || this.props.user?.email !== "admin@email.com") {
          this.props.navigate("/");
        }
    }

    render() {
        const { isLoggedIn, user, numCourses, listNotifications, filter, setNotificationFilter } = this.props;

        // To ensure the admin panel isn't displayed before componentDidMount redirects to Home
        if (!this.props.isLoggedIn || this.props.user?.email !== "admin@email.com") {
            return null; // or a loading screen/message
        }

        return (
            <Fragment>
                <h1 className={css(styles.title)}>Admin Dashboard</h1>
      
                <section className={css(styles.stats)}>
                    <div className={css(styles.users_courses)}>
                    <div className={css(styles.users)} id="st">
                        <p>users</p>
                    </div>
                    
                    <div className={css(styles.courses)} id="st">
                        <p>{numCourses}</p>
                    </div>
                    </div>
                    
                    <div className={css(styles.news)} id="st">
                    <p>news</p>
                    </div>
                    
                    <div className={css(styles.notifications)} id="st">
                        {this.props.listNotifications && 
                            <>
                                <p className={css(styles.p)}>Notifications</p>
                                <div className={css(styles.filterContainer)}>
                                    <button className={css(this.props.filter === 'DEFAULT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => this.props.setNotificationFilter('DEFAULT')}>All</button>
                                    <button className={css(this.props.filter === 'URGENT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => this.props.setNotificationFilter('URGENT')}>Urgent</button>
                                </div>
                            </>
                        }

                        <ul className={css(styles.ul)}>
                            { this.props.listNotifications ? (
                                Object.values(this.props.listNotifications).map((notification) => (
                                    <NotificationItem
                                        id={ notification.guid }
                                        key={ notification.guid }
                                        type={ notification.type }
                                        value={ notification.value }
                                        html={ notification.html }
                                    />
                                ))
                            ) : (
                                <NotificationItem
                                    id={ 0 }
                                    type="default"
                                    value="No new notification for now"
                                />
                            )}
                        </ul>
                    </div>
                </section>
            </Fragment>
        );
    }
}


const styles = StyleSheet.create({
    stats: {
        display: 'flex',
        gap: '10px',
        padding: '10px 40px',
        height: '380px',
        overflow: 'hidden',
    },
    
    users_courses: {
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        width: '20%',
    },
    
    users: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1px 1px 10px #c4c3c3',
        borderRadius: '17px',
        height: '50%',
    },
    
    courses: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '1px 1px 10px #c4c3c3',
        borderRadius: '17px',
        height: '50%',
    },
    
    news: {
        padding: '10px',
        flex: '1',
        boxShadow: '1px 1px 10px #c4c3c3',
        borderRadius: '17px',
        width: '40%',
    },
    
    notifications: {
        padding: '15px',
        flex: '1',
        boxShadow: '1px 1px 10px #c4c3c3',
        borderRadius: '17px',
        width: '40%',
        overflow: 'hidden',
        overflowY: 'scroll',
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
});

export const mapStateToProps = (state) => {

    return {
        isLoggedIn: state.ui.get('isUserLoggedIn'),
        user: state.ui?.get('user'),
        numCourses: state.courses.size || 0,
        listNotifications: getUnreadNotificationsByType(state),
        filter: filterTypeSelected(state),
    };
};

const mapDispatchToProps = {
    setNotificationFilter,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Admin));