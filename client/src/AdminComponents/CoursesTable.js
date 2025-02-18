import { css, StyleSheet } from "aphrodite";
import React, { Component, Fragment } from "react";
import { IoIosSearch } from "react-icons/io";


class CoursesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.listCourses || [],
            users: this.props.listUsers || [],
            // Keeps track of which course and field is being edited
            editingIndex: null, // Index of the row (autoincrement)
            addCourse: false, // Flag to show or hide the row that adds a new course
            newCourse: { name: "", duration: "" },
            filteredCourses: [], // Result of search query
            usersCourseIndex: null, // Index of course to display users for
            filteredUsers: [], // Holds the users assigned to the selected course when 'students' button is clicked
        };
    }

    handleEdit = (index, field) => {
        /* Function to mark which course is being edited*/
        this.setState({ editingIndex: index });
    };

    handleChange = (e, index, field) => {
        /* Function to handle changes made to input fields */
        let newCourses = [...this.state.courses]; // Make a copy of the courses array
        newCourses[index][field] = e.target.value; // Update the field of the user with new value
        this.setState({ courses: newCourses }); // Update state with the modified list of users
    };

    handleSave = async (index) => {
        /* Fuction that dispatches functions that sends requests to the API */

        // We set this condition to determine when we're adding a new course
        if (index === -1) {
            await this.props.createCourse(this.state.newCourse); // Send new Course to API
            // Reset the flag and the temp Course in the state
            this.setState({ addCourse: false, newCourse: { name: "", duration: "" } });
            // Calls fetchCourses in the parent to repopulates the state with the new list of Courses containing the new Course
            // listCourseC passed down as a prop from AdminPage will now include the new Course, and thus in Courses in this local state
            this.props.reloadCourses();
        } else {
            let courseToSave = this.state.courses[index];
            /*
            // If we searched for a Course, the displayed courses will be different, and the index corresponds to the filteredCourses
            if (this.state.filteredCourses.length > 0) {
                CourseToSave = this.state.filteredCourses[index];
            }
            */
            console.log(index);
            console.log(courseToSave);
            this.setState({ editingIndex: null });
            // courseToSave will be undefined if we click save without modifying anything
            // So only send an UPDATE request to the API if we made a modification
            if (courseToSave) {
                console.log("Saving course:", courseToSave);
                this.props.updateCourse(courseToSave);
            }
        }
    };

    componentDidUpdate(prevProps) {
        // Props might not be available when the constructor runs, so this ensures to update the state when they're passed in
        if (prevProps.listCourses !== this.props.listCourses) {
            this.setState({ courses: this.props.listCourses });
            this.setState({ users: this.props.listUsers });
        }
    };

    addCourse = () => {
        if (this.state.addCourse === false) {
            this.setState({ addCourse : true });
        } else {
            this.setState({ addCourse : false });
        }
    };

    handleChangeAdd = (e, field) => {
        // Updates the fiels of the newCourse in the state, so the newCourse contains all the new info before seding it to the api
        this.setState({ newCourse: { ...this.state.newCourse, [field]: e.target.value } });
    };

    handleDelete = async (index) => {
        // When we edit a course, the courses in the state will turn into a list with handlechange
        // If we delete a course after editing, we'll need to retrieve it from a list:
        let course = this.state.courses[index];
        if (course) {
            console.log(`course from list:`);
            console.log(course);
        } else {  // When deleting a course before editing, the state will be an immutable so we need to retrieve it with get
            course = this.state.courses.get(index);
            console.log(`course from immutable:`);
            console.log(course);
        }

        const confirmDelete = window.confirm(`Permanently delete this course: ${course.name} ?`);
    
        if (confirmDelete) {
            await this.props.deleteCourse(course);
            this.props.reloadCourses();
        } else {
            console.log("Delete action was canceled");
        }
    };

    handleSearch = (e) => {
        /* Filters the list of courses based on the search query from the search bar */
        // input: onChange={(e) => this.handleSearch(e)}
        // rows: {(this.state.filteredCourses.length > 0 ? this.state.filteredCourses : this.state.courses).map((course, index) => (
        const { courses } = this.state;
        const query = e.target.value;

        let filteredCourses;
        if (query === '') {
            filteredCourses = []; // Reset when search is cleared
        } else {
            // When we edit a course, the courses in the state will turn into a list because of handlechange
            if (Array.isArray(courses)) {
                // Filter: If any field includes the query
                filteredCourses = courses.filter(course =>
                    Object.values(course).some(value => value.toString().includes(query))
                );
            } else {
                filteredCourses = courses.toJS().filter(course =>
                    Object.values(course).some(value => value.toString().includes(query))
                );
            }
        }

        this.setState({ filteredCourses });
    };

    handleStudents = (index) => {
        if (index === this.state.coursesUserIndex) {
            // If we click on courses button of an already displayed courses, hide them
            this.setState({ coursesUserIndex: null });
            let course = this.state.courses[index];
            if (course) {
                console.log(`course from list:`);
                console.log(course);
            } else {  // WBefore editing, the state will be an immutable so we need to retrieve it with get
                course = this.state.courses.get(index);
                console.log(`course from immutable:`);
                console.log(course);
            }
            let courseID = course.id;
            console.log(courseID);

            let newUsers = [...this.state.users];
            let filteredUsers = newUsers.filter((user) =>
                user.courses.some((course) => course.id === courseID)
            );
            console.log(filteredUsers);
        } else {
            this.setState({ coursesUserIndex: index });
        }
        
    };
  
    render() {
      return (
        <Fragment>
            <div className={css(styles.h)}>
                <p className={css(styles.p)}>Courses</p>
                <div className={css(styles.searchBar)}>
                    <IoIosSearch size={20}/>
                    <input placeholder={'Search...'} className={css(styles.searchInput)} onChange={(e) => this.handleSearch(e)}/>
                </div>
                <button className={css(styles.registerButton)} onClick={() => this.addCourse()}>Register a New Course</button>
            </div>

            <table className={css(styles.table)}>
                <thead className={css(styles.th)}>
                    <tr>
                        <th className={css(styles.thTd)}>Name</th>
                        <th className={css(styles.thTd)}>Duration</th>
                        <th className={css(styles.thTd)}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.addCourse && (
                        <tr style={{ backgroundColor: '#49c78540' }}>
                            {["name", "duration"].map((field) => (
                                <td key={field}>
                                    <input
                                        placeholder={field}
                                        className={css(styles.input)}
                                        onChange={(e) => this.handleChangeAdd(e, field)}
                                    />
                                </td>
                            ))}
                            <td>
                                <button className={css(styles.cancelButton)} onClick={() => this.addCourse()}>Cancel</button>
                                <button className={css(styles.saveButton)} onClick={() => this.handleSave(-1)}>Save</button>
                            </td>
                        </tr>
                    )}

                    {/* Rows: loop through courses */}
                    {/* Display filteredCourses when a search result is found, OR ALL courses (default, no search) */}
                    {(this.state.filteredCourses.length > 0 ? this.state.filteredCourses : this.state.courses).map((course, index) => (
                        <Fragment key={course.id}>
                            <tr key={course.id} style={this.state.editingIndex === index ? { backgroundColor: '#49c78540' }: {}}>
                                {this.state.editingIndex === index
                                    ? ["name", "duration"].map((field) => (
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
                                            <td className={css(styles.thTd)}><b>{course.name}</b></td>
                                            <td className={css(styles.thTd)}>{course.duration}</td>
                                        </>
                                    )
                                }
                                <td className={css(styles.actionsTd)}>
                                    {(this.state.filteredCourses.length === 0) && (
                                        <>
                                            <button className={css(styles.coursesButton)} onClick={() => this.handleStudents(index)}>Students</button>
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


export default CoursesTable;