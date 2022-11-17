import { Action } from "../../Actions";
import { NIFTY_PCR_CHART_REQUEST, NIFTY_PCR_CHART_SUCCESS, NIFTY_REQUEST, NIFTY_SUCCESS } from "../../Actions/NiftyActions";

export interface NiftyReducerState{
    loading:boolean;
    loaded:boolean;
    NiftyPCRData:any[];
    NiftyPCRChartData:any[];
    NiftyOIChartData:any[];
}


const initalState:NiftyReducerState={
    loading:false,
    loaded:false,
    NiftyPCRData:[],
    NiftyPCRChartData:[],
    NiftyOIChartData:[]
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
        case NIFTY_PCR_CHART_REQUEST:{
            return {...state,loading:true,loaded:false};
        }
        case NIFTY_PCR_CHART_SUCCESS:{
            const newPCRData=action.payload.PCRData;
            const newOIData=action.payload.OIData;
            return {...state,loading:false,loaded:true,NiftyPCRChartData:newPCRData,NiftyOIChartData:newOIData}
        }

        default:{
            return state;
        }


    }
}



export const getLoading=(state:NiftyReducerState)=>state.loading;
export const getLoaded=(state:NiftyReducerState)=>state.loaded;
export const getNiftyPCR=(state:NiftyReducerState)=>state.NiftyPCRData;
export const getNiftyPCRChartData=(state:NiftyReducerState)=>state.NiftyPCRChartData;
export const getNiftyOIChartData=(state:NiftyReducerState)=>state.NiftyOIChartData;

