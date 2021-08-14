import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import *as SecurityActions from '../store/security.actions';
import { Security } from '../security.model';
import { Injectable } from "@angular/core";
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";
@Injectable()
export class SecurityEffects {
    @Effect()
    featchRecipe = this.actions$.pipe(
        ofType(SecurityActions.FETCH_SECURITY),
        switchMap(() => {
            return this.http
                .get<Security[]>(
                    'https://ng-recipe-book-c4b6c-default-rtdb.firebaseio.com/recipes.json'
                )
        }),
        map(securities => {
            return securities.map(security => {
                return {
                    ...security,
                    ingredients: security.subjections ? security.subjections : []
                };
            });
        }), map(securities => {
            return new SecurityActions.SetSecurity(securities)
        })
    )
    @Effect({dispatch:false})
    storeRecipes = this.actions$.pipe(
         ofType(SecurityActions.STORE_SECURITY),
         withLatestFrom(this.store.select('securities')),
        switchMap(([actionData,securityState]) => {
            return this.http
                .put(
                    'https://ng-recipe-book-c4b6c-default-rtdb.firebaseio.com/recipes.json',
                    securityState.securities
                )
        }
        )
        );
    

    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>) {

    }
}