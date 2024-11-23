import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';


export default function CourseListRow({ id, isHeader, textFirstCell, textSecondCell, isChecked, onChangeRow,
                                        textThirdCell, textFourthCell, textFifthCell, textSixthCell,
                                        name, credit, startDate, endDate, duration, status }) {
    const rowStyle = {backgroundColor: '#f5f5f5ab'};
    const headerStyle = {backgroundColor: '#deb5b545'};
    const style = isHeader ? headerStyle : rowStyle;

    if (isHeader) {
        if (!textSecondCell) {
            return (
                <tr style={style}>
                    <th colSpan='8' className={css(styles.firstTh, styles.th)}>{ textFirstCell }</th>
                </tr>
            );
        } else {
            return (
                <tr style={style}>
                    <th className={css(styles.th)}>{ textFirstCell }</th>
                    <th className={css(styles.th)}>{ textSecondCell }</th>
                    <th className={css(styles.th)}>{ textThirdCell }</th>
                    <th className={css(styles.th)}>{ textFourthCell }</th>
                    <th className={css(styles.th)}>{ textFifthCell }</th>
                    <th className={css(styles.th)}>{ textSixthCell }</th>
                </tr>
            );
        }
    } else {
        return (
            <tr style={style} className={isChecked ? css(styles.rowChecked) : ''}>
                <td className={css(styles.td)}><input type='checkbox' onClick={() => onChangeRow(id, !isChecked)}/>{ name }</td>
                <td className={css(styles.td)}>{ credit }</td>
                <td className={css(styles.td)}>{ startDate }</td>
                <td className={css(styles.td)}>{ endDate }</td>
                <td className={css(styles.td)}>{ duration }</td>
                <td className={css(styles.td)}>{ status }</td>
            </tr>
        );
    }
}

/*
CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
    isHeader: false,
    textSecondCell: null,
};*/

const styles = StyleSheet.create({
    firstTh: {
        textAlign: 'center',
        fontSize: '14px',
    },

    th: {
        borderBottom: '2px solid lightgrey',
        padding: '5px 0 5px 6px',
        fontSize: '14px',
    },

    rowChecked: {
        backgroundColor: '#e6e4e4',
    },

    td: {
        padding: '5px',
    },
});