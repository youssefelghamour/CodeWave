import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import { getUpdates } from "../selectors/updatesSelector";
import { fetchUpdates } from "../actions/updatesActionCreators";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';


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


class Updates extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchUpdates();
    }

    handleClick = (id) => {
        // Use navigate to redirect
        this.props.navigate(`/update/${id}`);
    };

    render() {
        const { listUpdates, fetchUpdates } = this.props;

        return (
            <aside>
                <h3 className={css(styles.sectionTitle)}>School Updates</h3>

                { listUpdates ? (
                    listUpdates.map((update) => (
                        <div className={css(styles.updateContainer)} key={update.id} onClick={() => this.handleClick(update.id)}>
                            <p className={css(styles.updateType)}> {update.type} </p>
                            <p className={css(styles.updateTitle)}> {update.title} </p>
                            <p className={css(styles.updateDate)}> {update.date} </p>
                        </div>
                    ))
                ) : (null)}
            </aside>
        );
    }
}

const styles = StyleSheet.create({
    sectionTitle: {
        margin: '5px 0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#e0354b',
        paddingBottom: '15px',
        borderBottom: '0.8px solid lightgrey',
    },

    updateContainer: {
        borderBottom: '0.8px solid lightgrey',
        cursor: 'pointer',

        ':hover': {
            transform: 'scale(1.02)',
        },

        '@media (max-width: 900px)': {
            textAlign: 'center',
        },
    },

    updateType: {
        margin: '5px 0',
        fontSize: '0.8rem',
    },

    updateTitle: {
        margin: '5px 0',
        fontSize: '1rem',
        fontWeight: 'bold',
    },

    updateDate: {
        margin: '5px 0',
        fontSize: '0.7rem',
    },
});

export const mapStateToProps = (state) => ({
    listUpdates: getUpdates(state),
});

export const mapDispatchToProps = {
    fetchUpdates,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Updates));