import {GET_NEWS} from "../constants";
import instance from '../axios-docs';

export function getNews() {
    return {
        type: GET_NEWS,
        payload: instance.get("/news")
    };
}
