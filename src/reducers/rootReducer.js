import { combineReducers } from 'redux';
import { courseReducer } from './courseReducer';
import { notificationReducer } from './notificationReducer';
import { uiReducer } from './uiReducer';
import { newsReducer } from './newsReducer';
import { updatesReducer } from './updatesReducer';


export const rootReducer = combineReducers({
    courses: courseReducer,
    notifications: notificationReducer,
    ui: uiReducer,
    news: newsReducer,
    updates: updatesReducer,
});