import { Map } from 'immutable';
import { FETCH_NEWS_SUCCESS } from '../actions/newsActionTypes';
import { newsNormalizer } from '../schema/news';


export const newsReducer = (state = Map([]), action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      // Normalize the news data
      let normalizedData = newsNormalizer(action.data).news;
      return state.merge(normalizedData);
    default:
      return state;
  }
};