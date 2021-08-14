import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';

import { Subscription } from 'rxjs';

import * as SecurityActions from '../securities/store/security.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private store:Store<fromApp.AppState>) {}

  
  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authDate=>{return authDate.user;}))
    .subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    //this.dataStorageService.storeRecipes();
    this.store.dispatch(new SecurityActions.StoreSecurity());
  }

  onFetchData() {
  //  this.dataStorageService.fetchRecipes().subscribe();
  this.store.dispatch( new SecurityActions.FetchSecurity())
  }

  onLogout() {
    //this.authService.logout();
   // this.store.dispatch(new AuthActition());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
