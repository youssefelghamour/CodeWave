import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";


class BodySection extends Component {
    render() {
        return (
            <div className={css(this.props.heroSection ? null : styles.bodySection)}>
                { this.props.title ? (
                        <h2 style={{fontSize: '3.5rem', letterSpacing: '-5px', textAlign: 'center', margin: '35px 0 0 0', lineHeight: '54px',}}>{ this.props.title }</h2>
                    ): (null)
                }


                { this.props.message ? (
                        <h3 style={{fontSize: '2rem', margin: '0', textAlign: 'center', color: 'darkgray',}}>{this.props.message}</h3>
                    ): (null)
                }
                

                { this.props.subtitle ? (
                        <h3 style={{fontSize: '1.5rem', /*margin: '8px 0 0 0',*/}}>{this.props.subtitle}</h3>
                    ): (null)
                }

                { this.props.children }
            </div>
        );
    }
}

BodySection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool,
    heroSection: PropTypes.bool,
}

BodySection.defaultProps = {
    title: '',
    children: null,
    isLoggedIn: false,
    heroSection: false,
}

const styles = StyleSheet.create({
    bodySection: {
        width: '75%',
        justifySelf: 'center',
    },
});

export default BodySection;