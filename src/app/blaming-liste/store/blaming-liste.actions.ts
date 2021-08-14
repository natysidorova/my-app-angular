import { Action } from "@ngrx/store";
import { Subjection } from '../../shared/subjection.model';

export const ADD_SUBJECTION = '[Blaming List] Add Subjection';
export const ADD_SUBJECTIONS = '[Blaming List] Add Subjections';
export const UPDATE_SUBJECTION = '[Blaming List] Update Subjection';
export const DELETE_SUBJECTION = '[Blaming List] Delete Subjection';
export const START_EDIT = '[Blaming List] Start Edit';
export const STOP_EDIT = '[Blaming List] Stop Edit ';

export class AddSubjection implements Action {
  readonly type = ADD_SUBJECTION;
  constructor(public payload: Subjection) {}
}

export class AddSubjections implements Action {
  readonly type = ADD_SUBJECTIONS;

  constructor(public payload: Subjection[]) {}
}
export class UpdateSubjection implements Action {
  readonly type = UPDATE_SUBJECTION;

  constructor(public payload:  Subjection) {}
}
export class DeleteSubjection implements Action {
  readonly type = DELETE_SUBJECTION;

  constructor(public payload: number) {}
}
export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;

}

export type BlamingListActions = AddSubjection | AddSubjections|
UpdateSubjection|DeleteSubjection|StopEdit|StartEdit;
