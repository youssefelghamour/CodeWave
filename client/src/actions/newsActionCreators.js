import { FETCH_NEWS_SUCCESS } from "./newsActionTypes";


export const setNews = (data) => ({
    type: FETCH_NEWS_SUCCESS,
    data,
});

export const fetchNews = () => {
    return (dispatch) => {
        // return fetch('http://localhost:8080/news.json')
        return fetch('http://localhost:5000/news')
            .then((response) => response.json())
            .then((data)  => dispatch(setNews(data)))
            .catch((error) => {});
    }
};