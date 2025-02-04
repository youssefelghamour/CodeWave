import { css, StyleSheet } from "aphrodite";
import React, { Component, Fragment } from "react";


class StudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.listUsers || [],
        };
    }
  
    handleEdit = (e, index, field) => {
        const newUsers = [...this.state.users];
        newUsers[index][field] = e.target.value;
        this.setState({ users: newUsers });
    };
  
    handleSave = (index) => {
        const userToSave = this.state.users[index];
        // Call API
        console.log('Saving user:', userToSave);
    };

    componentDidUpdate(prevProps) {
        // props might not be available when the constructor runs, so this ensures to update the state when they're passed in
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({ users: this.props.listUsers });
        }
    }
  
    render() {
      return (
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
                {this.state.users.map((user, index) => (
                <tr key={user.id}>
                    <td className={css(styles.thTd)}><input className={css(styles.input)} value={user.firstName} onChange={(e) => this.handleEdit(e, index, 'firstName')} /></td>
                    <td className={css(styles.thTd)}><input className={css(styles.input)} value={user.lastName} onChange={(e) => this.handleEdit(e, index, 'lastName')} /></td>
                    <td className={css(styles.thTd)}><input className={css(styles.input)} value={user.email} onChange={(e) => this.handleEdit(e, index, 'email')} /></td>
                    <td className={css(styles.thTd)}><input className={css(styles.input)} value={user.cohort} onChange={(e) => this.handleEdit(e, index, 'cohort')} /></td>
                    <td className={css(styles.thTd)}><input className={css(styles.input)} value={user.studentId} onChange={(e) => this.handleEdit(e, index, 'studentId')} /></td>
                    <td className={css(styles.thTd)}><button onClick={() => this.handleSave(index)}>Save</button></td>
                </tr>
                ))}
            </tbody>
        </table>
      );
    }
}


const styles = StyleSheet.create({
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        borderRadius: '8px',
        tableLayout: 'fixed',
    },
        
    thTd: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    
    th: {
        backgroundColor: '#f4f4f4',
    },

    input: {
        width: '100%',
        boxSizing: 'border-box',
    },
});


export default StudentsTable;