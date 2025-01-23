import React, { Component } from "react";
import CourseListRow from './CourseListRow';
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import { fetchCourses } from "../actions/courseActionCreators";
import { getCourses } from "../selectors/courseSelector";
import { connect } from "react-redux";
import { selectCourse, unSelectCourse } from "../actions/uiActionCreators";


class CourseList extends Component {
    constructor(props) {
        super(props);
        this.onChangeRow = this.onChangeRow.bind(this);
    }

    componentDidMount() {
        // fetches courses from courses.json (not needed anymore, we're fetching from user.courses)
        // this.props.fetchCourses();
    }

    onChangeRow(id, checked) {
        if (checked) {
            this.props.selectCourse(id);
        } else {
            this.props.unSelectCourse(id);
        }
    }

    render () {
        const { listCourses, fetchCourses, selectCourse, unSelectCourse, user } = this.props;

        return (
            <div className={css(styles.CourseListContainer)}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <div>
                        <p style={{margin: '0',}}>Sprint #1: <strong>156.64%</strong> </p>
                        <p style={{margin: '0',}}>Sprint #2: <strong>In Progress</strong> </p>
                        <p style={{margin: '0',}}>Upcoming Evaluations: <strong>Exam - Dec 5</strong></p>
                    </div>
                    <div style={{alignSelf: 'end'}}>
                        <p style={{margin: '0', float: 'inline-end'}}>Enrolled Courses: <strong>{listCourses.length}</strong></p>
                    </div>
                </div>

                <table id="CourseList" className={css(styles.table)} >
                    <thead>
                        <CourseListRow isHeader={ true } textFirstCell="Available courses" />
                        <CourseListRow isHeader={ true } textFirstCell="Course name" textSecondCell="Score" textThirdCell="Start Date" textFourthCell="End Date"
                                                         textFifthCell="Duration" textSixthCell="status" />
                    </thead>

                    <tbody>
                        { listCourses ? (
                            listCourses.map((course) => (
                                <CourseListRow
                                    key={ course.id }
                                    id={course.id}
                                    name={ course.name }
                                    credit={ course.credit }
                                    startDate={ course.start_date }
                                    endDate={ course.end_date }
                                    duration={ course.duration }
                                    status={ course.status }
                                    isHeader={ false }
                                    isChecked={ course.isSelected }
                                    onChangeRow={ this.onChangeRow }
                                />
                            ))
                        ) : (
                            <CourseListRow isHeader={ false } textFirstCell="No course available yet" />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

CourseList.propTypes = {
    listCourses: PropTypes.array,
    fetchCourses: PropTypes.func,
    selectCourse: PropTypes.func,
    unSelectCourse: PropTypes.func,
    user: PropTypes.object,
};

CourseList.defaultProps = {
    listCourses: [],
    fetchCourses: () => {},
    selectCourse: () => {},
    unSelectCourse: () => {},
    user: {},
}

const styles = StyleSheet.create({
    CourseListContainer: {
        padding: '2rem 0',
    },

    table: {
        width: '100%',
        textAlign: 'left',
        border: '1px solid lightgrey',
        fontSize: '15px',
    }
});

export const mapStateToProps = (state) => ({
    // Convert courses js object to an array
    listCourses: Object.values(state.ui.get('user').courses),
    user: state.ui.get('user'),
});

const mapDispatchToProps = {
    fetchCourses,
    selectCourse,
    unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);