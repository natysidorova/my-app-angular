import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loadding: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loadding: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loadding: false
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: null,
        user: null,
        loadding: false
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
       
      };
    default:
      return state;
  }
}
