import { Action } from "../../Actions";
import { NIFTY_REQUEST, NIFTY_SUCCESS } from "../../Actions/NiftyActions";

export interface NiftyReducerState{
    loading:boolean;
    loaded:boolean;
    NiftyPCRData:any[];
}


const initalState:NiftyReducerState={
    loading:false,
    loaded:false,
    NiftyPCRData:[]
}



export function NiftyReducer(state=initalState,action:Action){
    switch(action.type){

        case NIFTY_REQUEST:{
            return {...state,loading:true,loaded:false};
        }

        case NIFTY_SUCCESS:{
            const newData=action.payload.Data;
            
            
            return {...state,loading:false,loaded:true,NiftyPCRData:newData};
        }

        default:{
            return state;
        }


    }
}



export const getLoading=(state:NiftyReducerState)=>state.loading;
export const getLoaded=(state:NiftyReducerState)=>state.loaded;
export const getNiftyPCR=(state:NiftyReducerState)=>state.NiftyPCRData;
