import { Security } from "../security.model";
import * as fromActions from '../store/security.actions';

export interface State {
    securities: Security[];
}
const initialState: State = {
    securities: []
}
export function securityReducer(state = initialState, action: fromActions.SecurityActions) {
    switch (action.type) {
        case fromActions.SET_SECURITY:
            return {
                ...state,
                securities: [...action.payload]
            }
        case  fromActions.ADD_SECURITY:
            return {
                ...state,
                recipes: [...state.securities, action.payload]
            }
        case fromActions.UPDATE_SECURITY:
            const updateRecipe ={
                ...state.securities[action.payload.index],
                ...action.payload.newRecipe
            };
                const updatedRecipes=[...state.securities];
                updatedRecipes[action.payload.index]= updateRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            }
        case fromActions.DELETE_SECURITY:

            return {
                ...state,
                recipes: state.securities.filter((recipe, index)=>{
                    return index !== +action.payload;
                })
            }

        default:
            return state;

    }
}