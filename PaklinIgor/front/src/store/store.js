import {createStore, combineReducers, applyMiddleware} from 'redux';

//Middleware
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import {newsReducer} from './reducers/newsReduser';


//Reducers
const reducers = combineReducers({
    news: newsReducer
});

const middleware = applyMiddleware(promise(), logger, thunk);

const store = createStore(reducers, middleware);
export default store;