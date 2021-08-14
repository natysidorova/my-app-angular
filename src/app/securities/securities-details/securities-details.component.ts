import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import { Security } from '../security.model';
//import { securityService } from '../security.service';
import * as fromApp from '../../store/app.reducer';
import *as securityActions from '../store/security.actions';
import * as BlamingListActions from '../../blaming-liste/store/blaming-liste.actions';

@Component({
  selector: 'app-security-detail',
  templateUrl: './security-detail.component.html',
  styleUrls: ['./security-detail.component.css']
})
export class SecurityDetailComponent implements OnInit {
  security: Security;
  id: number;

  constructor(//private securityService: securityService,
              private route: ActivatedRoute,
              private router: Router,
              private store : Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params.pipe(map(params=>{
      return +params['id'];
    }), switchMap(id=>{
      this.id= id;
      return this.store.select('BlamingList')
    }),
    map(securitysState=>{
      return //securitysState.sec.find((security,index)=>{index===this.id})
    }))
      .subscribe(security=>{
        this.security = security;
      }
        );
  }

  onAddToShoppingList() {
    //this.securityService.addIngredientsToShoppingList(this.security.ingredients);
    this.store.dispatch(new BlamingListActions.AddSubjections(this.security.subjections));
  }

  onEditsecurity() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeletesecurity() {
    //this.securityService.deletesecurity(this.id);
    this.store.dispatch(new securityActions.DeleteSecurity(this.id));
    this.router.navigate(['/securitys']);
  }

}
