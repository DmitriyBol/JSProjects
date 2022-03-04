import React from "react";

const UPDATE_ITEMS = 'UPDATE_ITEMS';

const initialState = {
    currentItems: [],
}

export const addNewItem = (newItem) => {
    return {
        type: UPDATE_ITEMS,
        newItem,
    }
}
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ITEMS:
            return {
                ...state,
                currentItems: action.newItem,
            }
        default:
            return state;
    }

}