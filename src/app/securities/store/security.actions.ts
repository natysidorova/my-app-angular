import { Action } from "@ngrx/store";
import { Security } from "../security.model";

export const SET_SECURITY = '[Security] Set Security ';
export const FETCH_SECURITY = '[Security] Fetch Security ';
export const UPDATE_SECURITY = '[Security] Update Security ';
export const ADD_SECURITY = '[Security] Add Security ';
export const DELETE_SECURITY = '[Security] Delete Security ';
export const STORE_SECURITY= '[Security] Store Security ';
export class SetSecurity implements Action{
    readonly type = SET_SECURITY;
    constructor(public payload: Security[]) {}
}
export class FetchSecurity implements Action{
    readonly type = FETCH_SECURITY;
    
}
export class StoreSecurity implements Action{
    readonly type = STORE_SECURITY;
    
}
export class AddSecurity implements Action{
    readonly type = ADD_SECURITY;
    constructor(public payload:Security){}
}
export class DeleteSecurity implements Action{
    readonly type = DELETE_SECURITY;
    constructor(public payload: number){}
}
export class UpdateSecurity implements Action{
    readonly type = UPDATE_SECURITY;
    constructor(public payload:{index: number, newSecurity:Security}){}
}
export type SecurityActions = SetSecurity|AddSecurity|
UpdateSecurity|
DeleteSecurity| StoreSecurity;