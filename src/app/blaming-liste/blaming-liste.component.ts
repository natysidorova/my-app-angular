import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Store} from'@ngrx/store';
import { Subjection } from '../shared/subjection.model';

import * as BlamingListActions from '../blaming-liste/store/blaming-liste.actions'
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-blaming-liste',
  templateUrl: './blaming-liste.component.html',
  styleUrls: ['./blaming-liste.component.css']
})
export class BlamingListeComponent implements OnInit {

  subjections:Observable<{subjections:Subjection[]}>;
  

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subjections= this.store.select('BlamingList');
    this.store.select('BlamingList').subscribe();
   
  }

  onEditItem(index: number) {
    //this.slService.startedEditing.next(index);
    this.store.dispatch(new BlamingListActions.StartEdit(index));
   
  }
}
