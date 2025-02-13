import { css, StyleSheet } from "aphrodite";
import React, { Component, Fragment } from "react";


class UserCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.user.courses || [],
            // Keeps track of which user and field is being edited
            editingIndex: null, // Index of the row (autoincrement)
        };
    }

    handleChange = (e, index, field) => {
        /* Function to handle changes made to input fields */
        let newCourses = [...this.state.courses]; // Make a copy of the courses array
        newCourses[index][field] = e.target.value; // Update the field of the user with new value
        this.setState({ courses: newCourses }); // Update state with the modified list of courses
    };

    handleEdit = (index) => {
        /* Function to mark which field of the user is being edited*/
        this.setState({ editingIndex: index });
    };

    handleSave = async () => {
        /* Fuction that dispatches functions that sends requests to the API
           to update a course inside the list of courses for a user
           We are sending the whole user with the updated courses list to make use
           of the already existing functions: updateUser, and update controller
        */
        const updatedCourses = this.state.courses;

        const updatedUser = {
            ...this.props.user, // User data
            courses: updatedCourses, // Updated courses list
        };

        // Send the user with the updated courses to the API
        if (updatedUser) {
            console.log("Saving updated user:", updatedUser);
            this.props.updateUser(updatedUser);
        }

        this.setState({ editingIndex: null });
    };

    handleDelete = async (index) => {
        const confirmDelete = window.confirm(`Are you sure you want to remove this course?`);
    
        if (confirmDelete) {
            let newCourses = [...this.state.courses]; // Make a copy of the courses array
            newCourses.splice(index, 1); // Delete the selected course
            // Update state with the modified list of courses
            this.setState({ courses: newCourses }, this.handleSave);
            // Pass handleSave as a callback to ensure it doesn't run before the state is updated
        } else {
            console.log("Delete action was canceled");
        }
    };


    render() {
        const { user } = this.props;

        return (
            <tr>
                <td colSpan="6">
                    {/* Course Information */}
                    <table className={css(styles.table)}>
                        <thead className={css(styles.th)}>
                            <tr>
                                <th>Course Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Credit</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.courses.map((course, index) => (
                                <tr key={index} style={this.state.editingIndex === index ? { backgroundColor: '#49c78540' }: { backgroundColor: '#6153ca40' }}>
                                    {this.state.editingIndex === index
                                        ? ["name", "start_date", "end_date", "credit", "status"].map((field) => (
                                            <td key={field}>
                                                <input
                                                    value={course[field]}
                                                    className={css(styles.input)}
                                                    onChange={(e) => this.handleChange(e, index, field)}
                                                />
                                            </td>
                                        ))
                                        : (
                                            <>
                                                <td className={css(styles.thTd)}>{course.name}</td>
                                                <td className={css(styles.thTd)}>{course.start_date}</td>
                                                <td className={css(styles.thTd)}>{course.end_date}</td>
                                                <td className={css(styles.thTd)}>{course.credit}</td>
                                                <td className={css(styles.thTd)}>{course.status}</td>
                                            </>
                                        )
                                    }



                                    <td className={css(styles.actionsTd)}>
                                        {this.state.editingIndex === index ? (
                                            <button className={css(styles.saveButton)} onClick={() => this.handleSave()}>Save</button>
                                        ) : (
                                            <button className={css(styles.editeButton)} onClick={() => this.handleEdit(index)}>Edit</button>
                                        )}
                                        <button className={css(styles.deleteButton)} onClick={() => this.handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: '#0f008054',
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

export default UserCourses;