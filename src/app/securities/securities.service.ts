import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Security } from './security.model';
import { Subjection } from '../shared/subjection.model';

import { Store } from '@ngrx/store';
import * as BlamingListActions from '../blaming-liste/store/blaming-liste.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class SecurityService {
  securityChanged = new Subject<Security[]>();

  private securities: Security[] = [
    new Security(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Subjection('Meat', 1), new Subjection('French Fries', 20)]
    ),
    new Security(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Subjection('Buns', 2), new Subjection('Meat', 1)]
    )
  ];
  //private recipes: Recipe[] = [];

  constructor(private store:Store<fromApp.AppState>) {}

  setRecipes(recipes: Security[]) {
    this.securities = this.securities;
    this.securityChanged.next(this.securities.slice());
  }

  getRecipes() {
    return this.securities.slice();
  }

  getRecipe(index: number) {
    return this.securities[index];
  }

  addSubjectionsToShoppingList(subjections: Subjection[]) {
  
   this.store.dispatch(new BlamingListActions.AddSubjections(subjections));
  }

  addRecipe(security: Security) {
    this.securities.push(security);
    this.securityChanged.next(this.securities.slice());
  }

  updateRecipe(index: number, newRecipe: Security) {
    this.securities[index] = newRecipe;
    this.securityChanged.next(this.securities.slice());
  }

  deleteRecipe(index: number) {
    this.securities.splice(index, 1);
    this.securityChanged.next(this.securities.slice());
  }
}
