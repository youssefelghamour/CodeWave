import { css, StyleSheet } from "aphrodite";
import React, { Component } from "react";
import { getNews } from "../selectors/newsSelector";
import { fetchNews } from "../actions/newsActionCreators";
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


class News extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchNews();
    }

    handleClick = (id) => {
        // Use navigate to redirect
        this.props.navigate(`/news/${id}`);
    };

    render() {
        const { listNews, fetchNews } = this.props;

        return (
            <div className={css(styles.newsContainer)}>

                { listNews ? (
                    listNews.map((news) => (
                        <div className={css(styles.newsItem)} key={news.id} onClick={() => this.handleClick(news.id)}>
                            <img src={news.image} className={css(styles.coverImage)}></img>
                            <div className={css(styles.infoContainer)}>
                                <p className={css(styles.newsType)}>{news.type}</p>
                                <p className={css(styles.newsTitle)}>{news.title}</p>
                                <p className={css(styles.newsDate)}>{news.date}</p>
                            </div>
                        </div>
                    ))
                ) : ( <p>No news available</p>)}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    newsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',

        '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
        },
    },

    newsItem: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        alignSelf: 'stretch',
        transition: 'transform ease',

        ':hover': {
            transform: 'scale(102%)',
        },
    },

    coverImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        flexGrow: 1,
    },

    infoContainer: {
        padding: '8px 15px',
        /*backgroundColor: '#f2b1b282',
        background: 'linear-gradient(149deg, #e1003c 37%, #f100a5)',
        color: 'white',*/
        backgroundColor: '#b7b7b74f',
        color: 'black',
    },

    newsType: {
        margin: '5px 0',
        fontSize: '0.8rem',
    },

    newsTitle: {
        margin: '5px 0',
        fontSize: '1rem',
        fontWeight: 'bold',
    },

    newsDate: {
        margin: '5px 0',
        fontSize: '0.7rem',
    }
});

export const mapStateToProps = (state) => ({
    listNews: getNews(state),
});

export const mapDispatchToProps = {
    fetchNews,
};

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(News));