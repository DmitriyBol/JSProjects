import React from "react";
import {AnyAction} from "redux";

const ADD_TO_CARD = 'ADD_TO_CARD';
const DEL_FR_CARD = 'DEL_FR_CARD';

interface mainCardI {
    id: number | string;
    name: string;
    price: number;
    image: string;
}

const initialState = {
    card: {},
}

export const addNewItem = (cardItem: mainCardI) => {
    return {
        type: ADD_TO_CARD,
        cardItem,
    }
}

export const removeItem = (cardItem: mainCardI) => {
    return {
        type: DEL_FR_CARD,
        cardItem,
    }
}

export const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_TO_CARD:
            return {
                ...state,
                currentItems: action.cardItem,
            }
        case DEL_FR_CARD:
            return {
                ...state,
                currentItems: action.cardItem,
            }
        default:
            return state;
    }

}