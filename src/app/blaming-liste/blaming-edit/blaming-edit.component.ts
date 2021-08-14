import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Store} from'@ngrx/store';
import * as BlamingListActions from '../store/blaming-liste.actions';
import * as fromApp from '../../store/app.reducer';
import { Subjection } from '../../shared/subjection.model';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class BlamingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Subjection;

  constructor(private store:Store<fromApp.AppState>)  { }

  ngOnInit() {
   this.subscription= this.store.select('BlamingList').subscribe(stateDate=>{
      if(stateDate.editedSubjectionIndex>-1){
      this.editMode= true;
      this.editedItem= stateDate.editedSubjection;
    
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
      }else{
        this.editMode= false;
      }
    });
    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getSubjection(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSubjection = new Subjection(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new BlamingListActions.UpdateSubjection(newSubjection));
    } else {
    this.store.dispatch(new BlamingListActions.AddSubjection(newSubjection))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new BlamingListActions.StopEdit());
  }
  

  onDelete() {
  //  this.slService.deleteIngredient(this.editedItemIndex);
  this.store.dispatch(new BlamingListActions.DeleteSubjection(this.editedItemIndex))
    this.onClear();
    this.store.dispatch(new BlamingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new BlamingListActions.StopEdit());
  }

}
