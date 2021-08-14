import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { Security } from '../security.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css']
})
export class SecurityListComponent implements OnInit, OnDestroy {
  securitys: Security[];
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store : Store<fromApp.AppState>) {
  }

  ngOnInit() {
   this.subscription= this.store.select('securities')
   .pipe(map(securityState=> securityState.securities))
   .subscribe(
        (securitys: Security[]) => {
          this.securitys = securitys;
        }
      );
   // this.securitys = this.securityService.getsecuritys();
  }

  onNewsecurity() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
