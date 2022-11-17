import { Action } from "../../Actions";
import { BANKNIFTY_REQUEST, BANKNIFTY_SUCCESS } from "../../Actions/BankNiftyAction";

export interface BankNiftyReducerState{
    loading:boolean;
    loaded:boolean;
    BankNiftyPCRData:any[];
}

const initalState:BankNiftyReducerState={
    loading:false,
    loaded:false,
    BankNiftyPCRData:[]
}

export function BankNiftyReducer(state=initalState,action:Action){
    switch(action.type){

        case BANKNIFTY_REQUEST:{
            return {...state,loading:true,loaded:false};
        }

        case BANKNIFTY_SUCCESS:{
            const newData=action.payload.Data;
            
            
            return {...state,loading:false,loaded:true,BankNiftyPCRData:newData};
        }

        default:{
            return state;
        }


    }
}


export const getLoading=(state:BankNiftyReducerState)=>state.loading;
export const getLoaded=(state:BankNiftyReducerState)=>state.loaded;
export const getBankNiftyPCR=(state:BankNiftyReducerState)=>state.BankNiftyPCRData;
