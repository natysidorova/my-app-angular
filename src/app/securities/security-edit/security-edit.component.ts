import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
//import { securityService } from '../security.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as securityActions from '../store/security.actions';

@Component({
  selector: 'app-security-edit',
  templateUrl: './security-edit.component.html',
  styleUrls: ['./security-edit.component.css']
})
export class securityEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  securityForm: FormGroup;
  ingredientCount:number[];
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    //private securityService: securityService,
    private router: Router,
    private store :Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newsecurity = new security(
    //   this.securityForm.value['name'],
    //   this.securityForm.value['description'],
    //   this.securityForm.value['imagePath'],
    //   this.securityForm.value['ingredients']);
    if (this.editMode) {
      this.store.dispatch(new securityActions.UpdateSecurity({index:this.id, newsecurity: this.securityForm.value}));
     // this.securityService.updatesecurity(this.id, this.securityForm.value);
    } else {
      this.store.dispatch(new securityActions.AddSecurity(this.securityForm.value));
      //this.securityService.addsecurity(this.securityForm.value);
    }
    this.onCancel();
  }
 
  onAddIngredient() {
    (<FormArray>this.securityForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.securityForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let securityName = '';
    let securityImagePath = '';
    let securityDescription = '';
    let securityIngredients = new FormArray([]);

    if (this.editMode) {
      //const security = this.securityService.getsecurity(this.id);
      this.storeSub= this.store.select('securities').pipe(map(securitysState=>{
        return securitysState.securities.find((security,index)=>{
          return index === this.id;
        })
      })).subscribe(security=>{
        securityName = security?.name;
      securityImagePath = security?.imagePath;
      securityDescription = security?.description;
      this.ingredientCount =new Array( security?.subjections.length);
      if (security['ingredients']) {
        for (let ingredient of security.subjections) {
          securityIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
            
          );
        }
      }
      })
     
    }

    this.securityForm = new FormGroup({
      name: new FormControl(securityName, Validators.required),
      imagePath: new FormControl(securityImagePath, Validators.required),
      description: new FormControl(securityDescription, Validators.required),
      ingredients: securityIngredients
    });
  }
  ngOnDestroy(){
    if(this.storeSub)
    this.storeSub.unsubscribe();
  }
}
