import * as Constants from '../constants';

const initialState = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('tokenShopping'),
    is_loading: false,
    error_message: '',
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.REGISTRATION_PENDING: {
            state = {
                ...state,
                is_loading: true,
            };
            break;
        }
        case Constants.REGISTRATION_FULFILLED: {
            const token = action.payload.data.token;
            localStorage.setItem('tokenShopping', token);
            state = {
                ...state,
                userId: action.payload.data.id,
                token,
                is_loading: false,
            };
            break;
        }
        case Constants.REGISTRATION_REJECTED: {
            state = {
                ...state,
                userId: null,
                token: null,
                is_loading: false,
                error_message: action.payload.data.message,
            };
            break;
        }
        case Constants.LOGIN_PENDING: {
            state = {
                ...state,
                is_loading: true,
            };
            break;
        }
        case Constants.LOGIN_FULFILLED: {
            const token = action.payload.data.token;
            localStorage.setItem('tokenShopping', token);
            state = {
                ...state,
                userId: action.payload.data.id,
                token,
                is_loading: false,
            };
            break;
        }
        case Constants.LOGIN_REJECTED: {
            state = {
                ...state,
                userId: null,
                token: null,
                is_loading: false,
                error_message: action.payload.data.message,
            };
            break;
        }
        case Constants.LOGOUT: {
            localStorage.removeItem('tokenShopping');
            state = {
                ...state,
                userId: null,
                token: null,
                is_loading: false,
            };
            break;
        }
        default: { state = { ...state } }
    }
    return state;
}
