import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromNifty from "./Nifty/Nifty-Reducer";
import * as fromBankNifty from "./BankNifty/BankNifty-Reducer";
export interface RootReducerState{
    Nifty:fromNifty.NiftyReducerState;
    BankNifty:fromBankNifty.BankNiftyReducerState
}

export const rootReducer:ActionReducerMap<RootReducerState>={
    Nifty:fromNifty.NiftyReducer,
    BankNifty:fromBankNifty.BankNiftyReducer

}

export const getNiftyData=(state:RootReducerState)=>state.Nifty;
export const getBankNiftyData=(state:RootReducerState)=>state.BankNifty;

export const getNiftyLoading=createSelector(getNiftyData,fromNifty.getLoading);
export const getNiftyLoaded=createSelector(getNiftyData,fromNifty.getLoaded);
export const getNiftyPCR=createSelector(getNiftyData,fromNifty.getNiftyPCR);

//--------------------------------------------------------------------------

export const getBankNiftyLoading=createSelector(getBankNiftyData,fromBankNifty.getLoading);
export const getBankNiftyLoaded=createSelector(getBankNiftyData,fromBankNifty.getLoaded);
export const getBankNiftyPCR=createSelector(getBankNiftyData,fromBankNifty.getBankNiftyPCR);