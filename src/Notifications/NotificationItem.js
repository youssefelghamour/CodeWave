import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';


class NotificationItem extends PureComponent {
    render() {
        return this.props.value ? (
            <li data-notification-type={this.props.type}
                onClick={() => this.props.markAsRead(this.props.id)}
                className={ this.props.type === 'default' ? css(styles.default) : css(styles.urgent)}
            >
                {this.props.value}
            </li>
        ) : (
            <li data-notification-type={this.props.type}
                dangerouslySetInnerHTML={this.props.html}
                onClick={() => this.props.markAsRead(this.props.id)}
                className={ this.props.type === 'default' ? css(styles.default) : css(styles.urgent)}
            ></li>
        );
    }
}

NotificationItem.propTypes = {
    id: PropTypes.string,
    html: PropTypes.shape({
        __html: PropTypes.string,
    }),
    type: PropTypes.string,
    value: PropTypes.string,
    markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
    id: '0',
    type: 'default',
    markAsRead: () => {},
};

const styles = StyleSheet.create({
    default: {
        color: 'rgb(0, 0, 109)',
        cursor: 'pointer',
        margin: '7px 0',
        padding: '12px 16px',
        borderRadius: '20px',
        backgroundColor: '#b2a2da40',
        fontSize: '0.8rem',
        '@media (max-width: 900px)': {
            width: '-webkit-fill-available',
            listStyleType: 'none',
            fontSize: '16px',
            padding: '10px 20px',
        },
        ':hover': {
            backgroundColor: 'rgb(225 225 225 / 25%)',
        },
    },

    urgent: {
        color: 'rgb(222, 0, 0)',
        cursor: 'pointer',
        margin: '7px 0',
        padding: '12px 16px',
        borderRadius: '20px',
        backgroundColor: '#daa2a938',
        fontSize: '0.8rem',
        '@media (max-width: 900px)': {
            width: '-webkit-fill-available',
            listStyleType: 'none',
            fontSize: '16px',
            padding: '10px 20px',
        },
        ':hover': {
            backgroundColor: 'rgb(225 225 225 / 25%)',
        },
    },
});

export default NotificationItem;