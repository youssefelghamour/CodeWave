import { css, StyleSheet } from "aphrodite";
import React, { Component, Fragment } from "react";


class StudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.listUsers || [],
            // Keeps track of which user and field is being edited
            editingIndex: null, // Index of the row (autoincrement)
            addUser: false, // Flag to show or hide the row that adds a new user
            newUser: { firstName: "", lastName: "", email: "", cohort: "", studentId: "" },
        };
    }

    handleEdit = (index, field) => {
        /* Function to mark which field of the user is being edited*/
        this.setState({ editingIndex: index });
    };

    handleChange = (e, index, field) => {
        /* Function to handle changes made to input fields */
        const newUsers = [...this.state.users]; // Make a copy of the users array
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
            const userToSave = this.state.users[index];
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
  
    render() {
      return (
        <Fragment>
            <div className={css(styles.h)}>
                <p className={css(styles.p)}>Students</p>
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
                    {this.state.users.map((user, index) => (
                        <tr key={user.id} style={this.state.editingIndex === index ? { backgroundColor: '#49c78540' }: {}}>
                            {/* Columns: loop through each field of the user
                            {["firstName", "lastName", "email", "cohort", "studentId"].map((field) => (
                                <td
                                    key={field}
                                    className={css(styles.thTd)}
                                    onClick={() => this.handleEdit(index, field)} // When clicked, set the cell to be editable
                                >
                                    {this.state.editingIndex === index && this.state.editingField === field ? (
                                        <input
                                            className={css(styles.input)}
                                            value={user[field]}
                                            onChange={(e) => this.handleChange(e, index, field)}
                                            onBlur={this.handleBlur} // When input loses focus, stop editing
                                            autoFocus // Places the cursor in the clicked-on input cell (for typing)
                                        />
                                    ) : (
                                        user[field] // If not editing, show the user data as text
                                    )}
                                </td>
                            ))} */}
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
                            <td>
                                <button className={css(styles.coursesButton)} onClick={() => this.handleSave(index)}>Courses</button>
                                {this.state.editingIndex === index ? (
                                    <button className={css(styles.saveButton)} onClick={() => this.handleSave(index)}>Save</button>
                                ) : (
                                    <button className={css(styles.editeButton)} onClick={() => this.handleEdit(index)}>Edit</button>
                                )}
                            </td>
                        </tr>
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
});


export default StudentsTable;