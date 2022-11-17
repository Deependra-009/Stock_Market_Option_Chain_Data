import { Action } from "../../Actions";
import {   BANKNIFTY_REQUEST, BANKNIFTY_SUCCESS } from "../../Actions/BankNiftyAction";

export interface BankNiftyReducerState{
    loading:boolean;
    loaded:boolean;
    BankNiftyPCRData:any[];
    BankNiftyPCRChartData:any[];
    BankNiftyOIChartData:any[];
}

const initalState:BankNiftyReducerState={
    loading:false,
    loaded:false,
    BankNiftyPCRData:[],
    BankNiftyPCRChartData:[],
    BankNiftyOIChartData:[]
}

export function BankNiftyReducer(state=initalState,action:Action){
    switch(action.type){

        case BANKNIFTY_REQUEST:{
            
            return {...state,loading:true,loaded:false};
        }

        case BANKNIFTY_SUCCESS:{
            const newData=action.payload.Data;
            const newPCRData=action.payload.BankNiftyPCRData;
            const newOIData=action.payload.BankNiftyOIData;
            
            
            return {...state,loading:false,loaded:true,BankNiftyPCRData:newData,BankNiftyPCRChartData:newPCRData,BankNiftyOIChartData:newOIData};
        }
      
        default:{
            return state;
        }


    }
}


export const getLoading=(state:BankNiftyReducerState)=>state.loading;
export const getLoaded=(state:BankNiftyReducerState)=>state.loaded;
export const getBankNiftyPCR=(state:BankNiftyReducerState)=>state.BankNiftyPCRData;
export const getBankNiftyPCRChartData=(state:BankNiftyReducerState)=>state.BankNiftyPCRChartData;
export const getBankNiftyOIChartData=(state:BankNiftyReducerState)=>state.BankNiftyOIChartData;
