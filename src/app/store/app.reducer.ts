import { ActionReducerMap } from '@ngrx/store';

import * as fromBlamingList from '../blaming-liste/store/blaming-liste.reducer';
import * as fromSecurity from '../securities/store/security.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  BlamingList: fromBlamingList.State;
  auth: fromAuth.State;
  securities: fromSecurity.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  blamingList: fromBlamingList.blamingListReducer,
  auth: fromAuth.authReducer,
  securities: fromSecurity.securityReducer
};
