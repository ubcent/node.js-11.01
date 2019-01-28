import * as Constants from '../constants';

const initialState = {
    news: [],
    is_loading: false,
    error_message: ''
}

export function newsReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_NEWS_PENDING: {
            state = {
                ...state,
                is_loading: true
            };
            break;
        }        
        case Constants.GET_NEWS_FULFILLED: {
            state = {
                ...state,
                news: [...action.payload.data],
                is_loading: false
            };
            break;
        }        
        case Constants.GET_NEWS_REJECTED: {
            state = {
                ...state,
                news: [],                
                is_loading: false,
                error_message: action.payload.data.message
            };
            break;
        }
        default: {state = {...state}}
    }
    return state;
}
