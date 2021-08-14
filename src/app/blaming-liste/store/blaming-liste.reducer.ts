
import { Action } from "@ngrx/store";
import { Subjection } from "src/app/shared/subjection.model";

import* as blamingListActions  from '../store/blaming-liste.actions';

export interface State{
    subjections: Subjection[];
editedSubjection:Subjection;
editedSubjectionIndex:number;
}

const initialState:State = {
    subjections:[new Subjection('the low is following the reason 12.67 ', 5), new Subjection('the low is following the reason 13.56', 8)],
    editedSubjection:null,
    editedSubjectionIndex:-1
  };
export function blamingListReducer(
    state:State = initialState,
    action: blamingListActions.BlamingListActions
  ) {
    switch (action.type) {
      case blamingListActions.ADD_SUBJECTION:
        return {
          ...state,
          ingredients: [...state.subjections, action.payload]
        };
      case blamingListActions.ADD_SUBJECTIONS:
        return {
          ...state,
          ingredients: [...state.subjections, ...action.payload]
        };
      case blamingListActions.UPDATE_SUBJECTION:
          const ingredient= state.subjections[state.editedSubjectionIndex];
          const updatedIngredient={
            ...ingredient,
            ...action.payload
          };
          const updatedIngredients=[...state.subjections];
          updatedIngredients[state.editedSubjectionIndex]= updatedIngredient;
        return {
          ...state,
          ingredients:updatedIngredients,
          editedIngredient :null,
          editedIngredientIndex:-1
        };
        case blamingListActions.START_EDIT:
          return{
            ...state,
            editedIngredientIndex:action.payload,
            editedIngredient:{...state.subjections[action.payload]}
            
          };
          case blamingListActions.STOP_EDIT:
            return{
              ...state,
              editedIngredient:null,
              editedIngredientIndex:-1
            };
        case blamingListActions.DELETE_SUBJECTION:
        return {
          ...state,
          ingredients: state.subjections.filter((it, itIndex)=>{
            return itIndex!==state.editedSubjectionIndex}),
            editedIngredient :null,
            editedIngredientIndex:-1
        };
      default:
        return state;
    }
  }
  