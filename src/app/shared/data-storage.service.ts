import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Security } from '../securities/security.model';
import { SecurityService } from '../securities/securities.service';
import * as fromApp from '../store/app.reducer'; 
import * as fromActions from '../securities/store/security.actions'; 


@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private securityService: SecurityService,
    private store:Store<fromApp.AppState>) {}

  storeRecipes() {
    const securities = this.securityService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-c4b6c-default-rtdb.firebaseio.com/recipes.json',
        securities
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchSecurity() {
    return this.http
      .get<Security[]>(
        'https://ng-recipe-book-c4b6c-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(securities => {
          return securities.map(security => {
            return {
              ...security,
              subjections: security.ingredients ? security.ingredients : []
            };
          });
        }),
        tap(recipes => {
         
         this.store.dispatch(new fromActions.SetSecurity(recipes));
        })
      )
  }
}
