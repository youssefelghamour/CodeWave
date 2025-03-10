import { css, StyleSheet } from "aphrodite";
import React, { Component, Fragment } from "react";
import { IoIosSearch } from "react-icons/io";
import UserCourses from "./UserCourses";


class StudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.listUsers || [],
            // Keeps track of which user and field is being edited
            editingIndex: null, // Index of the row (autoincrement)
            addUser: false, // Flag to show or hide the row that adds a new user
            newUser: { firstName: "", lastName: "", email: "", cohort: "", studentId: "" },
            filteredUsers: [], // Result of search query
            coursesUserIndex: null, // Index of user to display courses for
        };
    }

    handleEdit = (index, field) => {
        /* Function to mark which field of the user is being edited*/
        this.setState({ editingIndex: index });
    };

    handleChange = (e, index, field) => {
        /* Function to handle changes made to input fields */
        let newUsers = [...this.state.users]; // Make a copy of the users array
        /*
        // If we searched for a user, the displayed users will be different, and the index corresponds to the filteredUSers
        if (this.state.filteredUsers.length > 0) {
            newUsers = [...this.state.filteredUsers];
        }
        */
        newUsers[index][field] = e.target.value; // Update the field of the user with new value
        this.setState({ users: newUsers }); // Update state with the modified list of users
    };

    handleBlur = () => {
        /* Get out of edit mode (input) when the input field loses focus (click outside) */
        this.setState({ editingIndex: null });
    };

    handleSave = async (index) => {
        /* Fuction that dispatches functions that sends requests to the API */

        // We set this condition to determine when we're adding a new user
        if (index === -1) {
            await this.props.createUser(this.state.newUser); // Send new user to API
            // Reset the flag and the temp user in the state
            this.setState({ addUser: false, newUser: { firstName: "", lastName: "", email: "", cohort: "", studentId: "" } });
            // Calls fetchUsers in the parent to repopulates the state with the new list of users containing the new user
            // listUsers passed down as a prop from AdminPage will now include the new user, and thus in users in this local state
            this.props.reloadUsers();
        } else {
            let userToSave = this.state.users[index];
            /*
            // If we searched for a user, the displayed users will be different, and the index corresponds to the filteredUSers
            if (this.state.filteredUsers.length > 0) {
                userToSave = this.state.filteredUsers[index];
            }
            */
            console.log(index);
            console.log(userToSave);
            this.setState({ editingIndex: null });
            // userToSave will be undefined if we click save without modifying anything
            // So only send an UPDATE request to the API if we made a modification
            if (userToSave) {
                console.log("Saving user:", userToSave);
                this.props.updateUser(userToSave);
            }
        }
    };

    componentDidUpdate(prevProps) {
        // Props might not be available when the constructor runs, so this ensures to update the state when they're passed in
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({ users: this.props.listUsers });
        }
    };

    addUser = () => {
        if (this.state.addUser === false) {
            this.setState({ addUser : true });
        } else {
            this.setState({ addUser : false });
        }
    };

    handleChangeAdd = (e, field) => {
        // Updates the fiels of the newUser in the state, so the newUser contains all the new info before seding it to the api
        this.setState({ newUser: { ...this.state.newUser, [field]: e.target.value } });
    };

    handleDelete = async (index) => {
        // When we edit a user, the users in the state will turn into a list with handlechange
        // If we delete a user after editing, we'll need to retrieve it from a list:
        let user = this.state.users[index];
        /*
        // If we searched for a user, the displayed users will be different, and the index corresponds to the filteredUSers
        if (this.state.filteredUsers.length > 0) {
            user = this.state.filteredUsers[index];
        } else {
            // If users is alist (after editing)
            if (user) {
                console.log(`user from list:`);
                console.log(user);
            } else {  // When deleting a user before editing, the state will be an immutable so we need to retrieve it with get
                user = this.state.users.get(index);
                console.log(`user from immutable:`);
                console.log(user);
            }
        }*/
        if (user) {
            console.log(`user from list:`);
            console.log(user);
        } else {  // When deleting a user before editing, the state will be an immutable so we need to retrieve it with get
            user = this.state.users.get(index);
            console.log(`user from immutable:`);
            console.log(user);
        }

        const confirmDelete = window.confirm(`Permanently delete this user: ${user.firstName} ${user.lastName}?`);
    
        if (confirmDelete) {
            await this.props.deleteUser(user);
            this.props.reloadUsers();
        } else {
            console.log("Delete action was canceled");
        }
    };

    handleSearch = (e) => {
        /* Filters the list of users based on the search query from the search bar */
        // input: onChange={(e) => this.handleSearch(e)}
        // rows: {(this.state.filteredUsers.length > 0 ? this.state.filteredUsers : this.state.users).map((user, index) => (
        const { users } = this.state;
        const query = e.target.value;

        let filteredUsers;
        if (query === '') {
            filteredUsers = []; // Reset when search is cleared
        } else {
            // When we edit a user, the users in the state will turn into a list because of handlechange
            if (Array.isArray(users)) {
                // Filter: If any field includes the query
                filteredUsers = users.filter(user =>
                    Object.values(user).some(value => value.toString().includes(query))
                );
            } else {
                filteredUsers = users.toJS().filter(user =>
                    Object.values(user).some(value => value.toString().includes(query))
                );
            }
        }

        this.setState({ filteredUsers });
    };

    handleCourses = (index) => {
        if (index === this.state.coursesUserIndex) {
            // If we click on courses button of an already displayed courses, hide them
            this.setState({ coursesUserIndex: null });
        } else {
            this.setState({ coursesUserIndex: index });
        }
        
    };
  
    render() {
      return (
        <Fragment>
            <div className={css(styles.h)}>
                <p className={css(styles.p)}>Students</p>
                <div className={css(styles.searchBar)}>
                    <IoIosSearch size={20}/>
                    <input placeholder={'Search...'} className={css(styles.searchInput)} onChange={(e) => this.handleSearch(e)}/>
                </div>
                <button className={css(styles.registerButton)} onClick={() => this.addUser()}>Register a New Student</button>
            </div>

            <table className={css(styles.table)}>
                <thead className={css(styles.th)}>
                    <tr>
                        <th className={css(styles.thTd)}>First Name</th>
                        <th className={css(styles.thTd)}>Last Name</th>
                        <th className={css(styles.thTd)}>Email</th>
                        <th className={css(styles.thTd)}>Cohort</th>
                        <th className={css(styles.thTd)}>Student ID</th>
                        <th className={css(styles.thTd)}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.addUser && (
                        <tr style={{ backgroundColor: '#49c78540' }}>
                            {["firstName", "lastName", "email", "cohort", "studentId"].map((field) => (
                                <td key={field}>
                                    <input
                                        placeholder={field}
                                        className={css(styles.input)}
                                        onChange={(e) => this.handleChangeAdd(e, field)}
                                    />
                                </td>
                            ))}
                            <td>
                                <button className={css(styles.cancelButton)} onClick={() => this.addUser()}>Cancel</button>
                                <button className={css(styles.saveButton)} onClick={() => this.handleSave(-1)}>Save</button>
                            </td>
                        </tr>
                    )}

                    {/* Rows: loop through users */}
                    {/* Display filteredUsers when a search result is found, OR ALL users (default, no search) */}
                    {(this.state.filteredUsers.length > 0 ? this.state.filteredUsers : this.state.users).map((user, index) => (
                        <Fragment key={user.id}>
                            <tr key={user.id} style={this.state.editingIndex === index ? { backgroundColor: '#49c78540' }: {}}>
                                {this.state.editingIndex === index
                                    ? ["firstName", "lastName", "email", "cohort", "studentId"].map((field) => (
                                        <td key={field}>
                                            <input
                                                value={user[field]}
                                                className={css(styles.input)}
                                                onChange={(e) => this.handleChange(e, index, field)}
                                            />
                                        </td>
                                    ))
                                    : (
                                        <>
                                            <td className={css(styles.thTd)}>{user.firstName}</td>
                                            <td className={css(styles.thTd)}>{user.lastName}</td>
                                            <td className={css(styles.thTd)}>{user.email}</td>
                                            <td className={css(styles.thTd)}>{user.cohort}</td>
                                            <td className={css(styles.thTd)}>{user.studentId}</td>
                                        </>
                                    )
                                }
                                <td className={css(styles.actionsTd)}>
                                    {(this.state.filteredUsers.length === 0) && (
                                        <>
                                            <button className={css(styles.coursesButton)} onClick={() => this.handleCourses(index)}>Courses</button>
                                            {this.state.editingIndex === index ? (
                                                <button className={css(styles.saveButton)} onClick={() => this.handleSave(index)}>Save</button>
                                            ) : (
                                                <button className={css(styles.editeButton)} onClick={() => this.handleEdit(index)}>Edit</button>
                                            )}
                                            <button className={css(styles.deleteButton)} onClick={() => this.handleDelete(index)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>

                            {this.state.coursesUserIndex === index && <UserCourses key={index} user={user} updateUser={this.props.updateUser} reloadUsers={this.props.reloadUsers}/>}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </Fragment>
      );
    }
}


const styles = StyleSheet.create({
    h: {
        margin: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    searchBar: {
        display: 'flex',
        padding: '8px 17px',
        backgroundColor: '#f2f2f29e',
        border: '1px solid #c6c5c5',
        color: '#787878',
        alignItems: 'center',
        borderRadius: '30px',
        paddingLeft: '12px',
    },

    searchInput: {
        background: 'none',
        border: 'none',
        marginLeft: '7px',
        color: '#919191',

        ':focus': {
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            color: 'black',
        },
    },
    
    registerButton: {
        padding: '9px 20px',
        backgroundColor: '#52919e',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#3a9e6a',
        },
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '8px',
        /*tableLayout: 'fixed',*/
        tableLayout: 'auto',
    },
        
    thTd: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
        whiteSpace: 'nowrap', // Prevents line breaks
        maxWidth: '200px', // Prevents it from expanding too much
        overflow: 'hidden', // Ensures text doesn't overflow
        textOverflow: 'ellipsis', // Adds ellipsis if text is too long
    },
    
    th: {
        backgroundColor: '#f4f4f4',
    },

    input: {
        maxWidth: '200px',
        boxSizing: 'border-box',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        background: 'none',
        outline: 'none',
        border: 'none',
        padding: '8px',
    },

    editeButton: {
        padding: '6px 12px',
        backgroundColor: 'grey',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        marginRight: '10px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#5d4ebc',
        },
    },

    saveButton: {
        padding: '6px 12px',
        backgroundColor: '#49c785',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        marginRight: '10px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#3a9e6a',
        },
    },

    coursesButton: {
        padding: '6px 12px',
        backgroundColor: '#433131',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        marginRight: '10px',
        marginLeft: '10px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#5d4ebc',
        },
    },

    cancelButton: {
        padding: '6px 12px',
        backgroundColor: 'white',
        border: '1px solid #8080808f',
        color: 'black',
        borderRadius: '30px',
        marginRight: '10px',
        marginLeft: '10px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#dfdfdf',
        },
    },

    deleteButton: {
        padding: '6px 12px',
        backgroundColor: '#ff3665',
        border: 'none',
        color: 'white',
        borderRadius: '30px',
        cursor: 'pointer',

        ':hover' : {
            backgroundColor: '#ef2353',
        },
    },

    actionsTd: {
        width: '20%',
    },
});


export default StudentsTable;