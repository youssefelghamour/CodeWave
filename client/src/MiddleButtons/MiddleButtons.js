import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import { VscTriangleRight } from "react-icons/vsc";


export default class MiddleButtons extends Component {
    render () {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.middleButton)}>
                    <p className={css(styles.text)}>New Classroom Technology</p>

                    <div className={css(styles.iconContainer)}>
                        <VscTriangleRight />
                    </div>
                </div>

                <div className={css(styles.middleButton)}>
                    <p className={css(styles.text)}>Prior Learning Assessment</p>

                    <div className={css(styles.iconContainer)}>
                        <VscTriangleRight />
                    </div>
                </div>

                <div className={css(styles.middleButton)}>
                    <p className={css(styles.text)}>Career Opportunities</p>

                    <div className={css(styles.iconContainer)}>
                        <VscTriangleRight />
                    </div>
                </div>

                <div className={css(styles.middleButton)}>
                    <p className={css(styles.text)}>Alumni's Space</p>

                    <div className={css(styles.iconContainer)}>
                        <VscTriangleRight />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '30px',

        '@media (max-width: 1080px)': {
            gridTemplateColumns: '1fr 1fr',
        },

        '@media (max-width: 550px)': {
            gridTemplateColumns: '1fr',
        },
    },

    middleButton: {
        display: 'grid',
        gridTemplateColumns: '7fr 1fr',
        alignItems: 'center',
        border: 'none',
        //background: 'linear-gradient(149deg, #e1003c 37%, #f100a5)',
        backgroundColor: '#e9e9e9',
        color: 'black',
        //background: 'linear-gradient(145deg, #8e9eab 0%, #eef2f3  51%)',
        //background: 'linear-gradient(329deg, rgb(165 149 157) 0%, rgb(233 233 233) 51%, white 100%)',
        background: 'linear-gradient(68deg, #e9e9e9, #e9e9e921) !important',
        borderRadius: '20px',
        clipPath: 'border-box',
        cursor: 'pointer',

        ':hover': {
            background: 'linear-gradient(329deg, rgb(165 149 157) 0%, rgb(233 233 233) 51%, white 100%)',
        },
    },

    text: {
        padding: '10px 25px',
        fontSize: '14px',
        fontWeight: 'bold',
    },

    iconContainer: {
        backgroundColor: 'black',
        height: '100%',
        alignContent: 'center',
        textAlign: 'center',
        padding: '0 15px',
        //background: 'linear-gradient(145deg, #8e9eab 0%, #eef2f3  51%)',
        background: 'linear-gradient(321deg, rgb(165 149 157) 0%, rgb(233 233 233) 51%, white 100%)',
        color: 'black',

        ':hover': {
            background: 'llinear-gradient(329deg, rgb(165 149 157) 0%, rgb(233 233 233) 51%, white 100%)',
        },
    },
});