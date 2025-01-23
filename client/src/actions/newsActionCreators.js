import { FETCH_NEWS_SUCCESS } from "./newsActionTypes";


export const setNews = (data) => ({
    type: FETCH_NEWS_SUCCESS,
    data,
});

export const fetchNews = () => {
    return (dispatch) => {
        return fetch('http://localhost:8080/news.json')
            .then((response) => response.json())
            .then((data)  => dispatch(setNews(data)))
            .catch((error) => {});
    }
};