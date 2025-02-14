import { StyleSheet, css } from "aphrodite";
import React, { Component, Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import NotificationItem from "../Notifications/NotificationItem";
import { TbUrgent } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';


class AdminNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,  // Display input to push a new notification
            addUrgent: false,  // New notification is urgent
            newNotificationContext: null,
            numberOfNotification: Object.keys(this.props.listNotifications).length,
        };
    }


    addNotif = () => {
        /* Sets add flag to true to display the input to add a notification */
        this.setState({ add : true });
    };

    addUrgent = () => {
        /* Sets the urgent flag to determin if the new notification is urgent or default */
        if (this.state.addUrgent === false) {
            this.setState({ addUrgent: true });
        } else {
            this.setState({ addUrgent: false });
        }
    };

    handleChange = (e) => {
        this.setState({ newNotificationContext: e.target.value });
    };

    handleAdd = async () => {
        const contextGuid = uuidv4();

        const newNtoification = {
            "author": {
                "id": "1",
                "email": "admin@email.com",
                "password": "admin",
                "role": "admin"
            },
            "context": {
                "guid": contextGuid,
                "type": this.state.addUrgent ? "urgent" : "default",
                "value": this.state.newNotificationContext
            }
        };

        await this.props.createNotification(newNtoification);
        this.props.fetchNotifications();

        this.setState({
            add: false,
            addUrgent: false,
            newNotificationContext: null,
        });
    }


    render() {
        return (
            <Fragment>
                {this.props.listNotifications && 
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                            <p className={css(styles.p)}>Notifications: {this.state.numberOfNotification}</p>
                            <IoIosAddCircle size={22} onClick={() => this.addNotif()} style={{ cursor: "pointer" }}/>    
                        </div>
                        <div className={css(styles.filterContainer)}>
                            <button className={css(this.props.filter === 'DEFAULT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => this.props.setNotificationFilter('DEFAULT')}>All</button>
                            <button className={css(this.props.filter === 'URGENT' ? styles.filterButtonSelected : styles.filterButton)} onClick={() => this.props.setNotificationFilter('URGENT')}>Urgent</button>
                        </div>
                    </>
                }

                <div className={css(styles.notifContainer)}>
                    

                    <ul className={css(styles.ul)}>
                        { this.state.add &&
                            <form style={{ display: 'flex', gap: '8px',}} onSubmit={(e) => { e.preventDefault(); this.handleAdd(); }}>
                                <div className={css(styles.inputContainer)} >
                                    <input className={css(styles.input)} onChange={(e) => this.handleChange(e)}/>
                                    <TbUrgent
                                        size={19}
                                        style={ this.state.addUrgent ? { color: 'red', cursor: 'pointer', } : { cursor: 'pointer'}}
                                        onClick={() => this.addUrgent()}
                                    />
                                </div>
                                <button className={css(styles.submit)}>Add</button>
                            </form>
                        }

                        { this.props.listNotifications ? (
                            Object.values(this.props.listNotifications).map((notification, index) => (
                                <NotificationItem
                                    id={ notification.guid }
                                    key={ notification.guid || index}
                                    type={ notification.type }
                                    value={ notification.value }
                                    html={ notification.html }
                                />
                            ))
                        ) : (
                            <NotificationItem
                                id={ 0 }
                                key="no-notification"
                                type="default"
                                value="No new notification for now"
                            />
                        )}
                    </ul>
                </div>
            </Fragment>
        );
    }
}


const styles = StyleSheet.create({
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

    notifContainer: {
        height: '74%',
        overflowY: 'auto',
        padding: '0 15px 0 5px',
        marginTop: '16px',
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
        marginTop: '0',
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

    inputContainer: {
        margin: '7px 0px',
        /*padding: '12px 16px',*/
        borderRadius: '20px',
        backgroundColor: '#d6d6d640',
        fontSize: '0.8rem',
        border: '1px solid grey',
        width: '-webkit-fill-available',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '15px',
    },

    input: {
        border: 'none',
        background: 'none',
        padding: '7px 15px',

        ':focus': {
            outline: 'none',
        },
    },

    submit: {
        margin: '7px 0px',
        borderRadius: '20px',
        fontSize: '13px',
        padding: '0 10px',
        border: '1px solid grey',
        backgroundColor: '#49c785',
        color: 'white',
        cursor: 'pointer',

        ':hover': {
            backgroundColor: '#3a9e6a',
        },
    },
});


export default AdminNotifications;