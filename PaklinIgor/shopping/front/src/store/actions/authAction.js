import { REGISTRATION, LOGIN, LOGOUT } from "../constants";
import instance from '../axios-docs';

export function registration(name, email, password) {
    return {
        type: REGISTRATION,
        payload: instance.post("/auth/registration", { name, email, password }),
    };
}

export function login(email, password) {
    return {
        type: LOGIN,
        payload: instance.post("/auth/login", {email, password}),
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
