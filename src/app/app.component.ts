import { Component, OnInit, Inject , PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { Store } from '@ngrx/store';

//import { LoggingService } from '.';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    //private loggingService: LoggingService
    @Inject(PLATFORM_ID) private platFormId
  ) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platFormId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    
   // this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
