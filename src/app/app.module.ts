import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SecuritiesComponent } from './securities/securities.component';
import { SecurityStartComponent } from './securities/security-start/security-start.component';
import { SecurityDetailComponent } from './securities/securities-details/securities-details.component';
import { BlamingEditComponent } from './blaming-liste/blaming-edit/blaming-edit.component';
import { SecurityListComponent } from './securities/security-list/security-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SecuritiesComponent,
    SecurityDetailComponent,
    SecurityEditComponent,
    SecurityStartComponent,
    SecurityListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
