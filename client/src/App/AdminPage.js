import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from "../selectors/notificationSelector";
import { createNotification, fetchNotifications, setNotificationFilter } from "../actions/notificationActionCreators";
import { HiMiniUsers } from "react-icons/hi2";
import { getNews } from "../selectors/newsSelector";
import { MdLibraryBooks } from "react-icons/md";
import { deleteUser, fetchUsers, updateUser } from "../actions/uiActionCreators";
import { getUsers } from "../selectors/uiSelector";
import StudentsTable from "../AdminComponents/StudentsTable";
import logo from '../../dist/logo.png';
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { LiaBookSolid } from "react-icons/lia";
import { PiNewspaper } from "react-icons/pi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { createUser } from "../actions/uiActionCreators";
import AdminNotifications from "../AdminComponents/AdminNotifications";
import hero from '../assets/hero-bg1.jpg';
import { getCourses } from "../selectors/courseSelector";
import { createCourse, deleteCourse, fetchCourses, updateCourse } from "../actions/courseActionCreators";
import CoursesTable from "../AdminComponents/CoursesTable";
import { GoGear } from "react-icons/go";


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

        // PoPulate state.ui.users with the whole list of users from the database
        this.props.fetchUsers();
    }

    reloadUsers = () => {
        /* Function passed down to StudentsTable so it can fetch the users again after adding a new user
            so the table includes the newly added user */
        this.props.fetchUsers();
    }

    reloadCourses = () => {
        /* Function passed down to StudentsTable so it can fetch the users again after adding a new user
            so the table includes the newly added user */
        this.props.fetchCourses();
    }

    render() {
        const { isLoggedIn, user, numCourses, listNotifications, filter, setNotificationFilter, listNews, listUsers, updateUser, createUser, deleteUser, createNotification, fetchNotifications, listCourses, updateCourse, createCourse, deleteCourse } = this.props;

        // To ensure the admin panel isn't displayed before componentDidMount redirects to Home
        if (!this.props.isLoggedIn || this.props.user?.email !== "admin@email.com") {
            return null; // or a loading screen/message
        }

        return (
            <div className={css(styles.body)}>
                <aside className={css(styles.sideBar)}>
                    <div className={css(styles.logo)}>
                        <img className={css(styles.img)} src={logo} alt="logo" />
                        <h2>CodeWave</h2>
                    </div>
                    
                    <nav>
                        <p className={css(styles.asideTitle)}>Dashboard</p>
                        
                        <div className={css(styles.navItemContainer)}>
                            <FiUsers />
                            <p className={css(styles.navItems)}>Students</p>
                        </div>
                        <div className={css(styles.navItemContainer)}>
                            <PiNewspaper />
                            <p className={css(styles.navItems)}>News</p>
                        </div>
                        <div className={css(styles.navItemContainer)}>
                            <MdOutlineTipsAndUpdates />
                            <p className={css(styles.navItems)}>Updates</p>
                        </div>
                        <div className={css(styles.navItemContainer)}>
                            <IoMdNotificationsOutline />
                            <p className={css(styles.navItems)}>Notifications</p>
                        </div>
                        <div className={css(styles.navItemContainer)}>
                            <LiaBookSolid />
                            <p className={css(styles.navItems)}>Courses</p>
                        </div>
                        <div className={css(styles.navItemContainer)}>
                            <GoGear />
                            <a href="http://localhost:5000" className={css(styles.navItems)}>API</a>
                        </div>
                    </nav>

                    <div className={css(styles.asideFooter)}>
                        <FaArrowLeft />
                        <a href="http://localhost:8080" style={{margin: '0 0 0 13px', textDecoration: 'none', color: 'white',}}>Return Home</a>
                    </div>
                </aside>

                <div className={css(styles.main)}>
                    <div className={css(styles.header)}>
                        <h1 className={css(styles.title)}>Admin Dashboard</h1>
                        <div className={css(styles.logout)}>
                            Admin
                            <FaCircleUser size={25}/>
                            <button className={css(styles.logoutButton)}>Logout</button>
                        </div>
                    </div>

                    <div className={css(styles.statsContainer)}>
                        <section className={css(styles.stats)}>
                            <div className={css(styles.users_courses)}>
                                <div className={css(styles.users)} id="st">
                                    <HiMiniUsers size={40}/>
                                    <p>{listUsers.size ? <><b>{listUsers.size - 1}</b> Students</> : 'No Students'}</p>
                                </div>
                                
                                <div className={css(styles.courses)} id="st">
                                    <MdLibraryBooks size={40}/>
                                    <p><b>{numCourses}</b> Courses</p>
                                </div>
                            </div>
                            
                            <div className={css(styles.news)} id="st">
                                <p className={css(styles.p)}>News & Updates Articles</p>
                                <div className={css(styles.newsContainer)}>
                                    { listNews ? (
                                        listNews.map((news) => (
                                            <div className={css(styles.newsItem)} key={news.id} onClick={() => this.handleClick(news.id)}>
                                                <div className={css(styles.infoContainer)}>
                                                    <p className={css(styles.newsType)}>{news.type}</p>
                                                    <p className={css(styles.newsTitle)}>{news.title}</p>
                                                    <p className={css(styles.newsDate)}>{news.date}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : ( <p>No news available</p>)}
                                </div>
                            </div>
                            
                            <div className={css(styles.notifications)} id="st">
                                <AdminNotifications listNotifications={this.props.listNotifications} filter={this.props.filter} createNotification={createNotification} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} />
                            </div>
                        </section>

                        <section className={css(styles.studentsSection)}>
                            { listUsers ? (
                                <StudentsTable listUsers={listUsers.filter(user => user.role !== 'admin')} updateUser={updateUser} createUser={createUser} reloadUsers={this.reloadUsers} deleteUser={deleteUser}/>
                            ) : (<p>no users</p>)}
                        </section>

                        <section className={css(styles.coursesSection)}>
                            { listCourses ? (
                                <CoursesTable listCourses={listCourses} listUsers={listUsers.filter(user => user.role !== 'admin')} updateCourse={updateCourse} createCourse={createCourse} reloadCourses={this.reloadCourses} deleteCourse={deleteCourse}/>
                            ) : (<p>no users</p>)}
                        </section>
                    </div>
                    
                </div>
            </div>
        );
    }
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: '#8080801f',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        fontFamily: 'Poppins',
        fontSize: '14px',
    },

    sideBar: {
        width: '13%',
        position: 'fixed',
        minHeight: '100vh',
        paddingLeft: '25px',
        paddingRight: '25px',
        backgroundColor: 'grey',
        marginRight: '25px',
        background: 'linear-gradient(149deg, #da2c52 37%, #da2550)',
        color: 'white',
        /*borderBottomRightRadius: '27px',*/
        /*borderTopRightRadius: '27px',*/
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.74),rgba(0, 0, 0, 0.64)), url(${hero})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        color: 'white',
    },

    logo: {
        display: 'flex',
        alignItems: 'center',
    },

    img: {
        width: '2rem',
        height: 'fit-content',
        padding: '12px 8px 12px 0',
        cursor: 'pointer',
        /*filter: 'brightness(10)',*/
    },

    asideTitle: {
        padding: '12px 18px',
        color: 'black',
        borderRadius: '8px',
        backgroundColor: 'white',
    },

    navItemContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '14px',
    },

    navItems: {
        fontSize: '14px',
        color: 'white',
        cursor: 'pointer',
        margin: '5px',
        marginLeft: '14px',
        textDecoration: 'none',

        ':hover': {
            color: 'lightgrey',
        },
    },

    asideFooter: {
        display: 'flex',
        position: 'absolute',
        bottom: '3%',
        fontSize: '16px',
        alignItems: 'center',
        cursor: 'pointer',

        ':hover': {
            color: 'lightgrey',
        },
    },



    main: {
        width: '100%',
        /*marginRight: '25px',
        marginLeft: '19%',*/
        marginLeft: 'calc(13% + 50px)', // width of aside + its side paddings (25px each)
        height: 'max-content',
        marginBottom: '20px',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingLeft: '26px',
        boxShadow: 'rgb(127 127 127 / 67%) 0px 0px 15px',
        background: 'white',
    },

    logout: {
        display: 'flex',
        position: 'relative',
        right: '25px',
        gap: '10px',
        alignItems: 'center',
    },

    logoutButton: {
        padding: '6px 12px',
        backgroundColor: 'red',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#da2c52',
        },
    },

    title: {
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        /*left: '10%',*/
    },


    statsContainer: {
        marginRight: '50px',
        marginLeft: '50px',
    },

    stats: {
        display: 'flex',
        gap: '20px',
        padding: '10px',
        height: '380px',
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        /*width: '80%',*/
        width: '100%',
        justifySelf: 'center',
    },
    
    users_courses: {
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        width: '20%',
    },
    
    users: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgb(196 195 195 / 67%) 0px 0px 10px',
        border: '1.5px solid #95959566',
        borderRadius: '8px',
        height: '50%',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    
    courses: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgb(196 195 195 / 67%) 0px 0px 10px',
        border: '1.5px solid #95959566',
        borderRadius: '8px',
        height: '50%',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    



    news: {
        padding: '15px',
        flex: '1',
        boxShadow: 'rgb(196 195 195 / 67%) 0px 0px 10px',
        border: '1.5px solid #95959566',
        borderRadius: '8px',
        width: '40%',
        backgroundColor: 'white',
    },

    newsContainer: {
        height: 'calc(100% - 55px)',
        overflowY: 'auto',
        padding: '0 15px 0 5px',
        marginTop: '16px',
    },

    newsItem: {
        //padding: '10px',
        borderBottom: '1px solid #dedcdc',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignSelf: 'stretch',
        transition: 'transform ease',

        ':hover': {
            transform: 'scale(102%)',
        },
    },

    infoContainer: {
        padding: '8px 15px',
        /*backgroundColor: '#f2b1b282',
        background: 'linear-gradient(149deg, #e1003c 37%, #f100a5)',
        color: 'white',*/
        //backgroundColor: '#b7b7b74f',
        color: 'black',
    },

    newsType: {
        //margin: '5px 0',
        margin: '0',
        fontSize: '0.8rem',
    },

    newsTitle: {
        //margin: '5px 0',
        margin: '0',
        fontSize: '1rem',
        fontWeight: 'bold',
    },

    newsDate: {
        margin: '0',
        fontSize: '0.7rem',
    },






    
    notifications: {
        padding: '15px',
        flex: '1',
        boxShadow: 'rgb(196 195 195 / 67%) 0px 0px 10px',
        border: '1.5px solid #95959566',
        borderRadius: '8px',
        width: '40%',
        overflow: 'hidden',
        backgroundColor: 'white',
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



    studentsSection: {
        /*width: '80%',*/
        width: '100%',
        justifySelf: 'center',
        fontFamily: 'Poppins',
        margin: '20px 0',
        boxShadow: 'rgb(196, 195, 195) 1px 1px 10px',
        boxShadow: 'rgba(196, 195, 195, 0.67) 0px 0px 10px',
        border: '1.5px solid rgba(149, 149, 149, 0.4)',
        borderRadius: '8px',
        backgroundColor: 'white',
    },

    coursesSection: {
        /*width: '80%',*/
        width: '100%',
        justifySelf: 'center',
        fontFamily: 'Poppins',
        margin: '30px 0',
        boxShadow: 'rgb(196, 195, 195) 1px 1px 10px',
        boxShadow: 'rgba(196, 195, 195, 0.67) 0px 0px 10px',
        border: '1.5px solid rgba(149, 149, 149, 0.4)',
        borderRadius: '8px',
        backgroundColor: 'white',
    },
});

export const mapStateToProps = (state) => ({
    isLoggedIn: state.ui.get('isUserLoggedIn'),
    user: state.ui?.get('user'),
    numCourses: state.courses.size || 0,
    listNotifications: getUnreadNotificationsByType(state),
    filter: filterTypeSelected(state),
    listNews: getNews(state),
    listUsers: getUsers(state),
    listCourses: getCourses(state),
});

const mapDispatchToProps = {
    setNotificationFilter,
    fetchUsers,
    updateUser,
    createUser,
    deleteUser,
    createNotification,
    fetchNotifications,
    fetchCourses,
    updateCourse,
    createCourse,
    deleteCourse,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Admin));