export const NIFTY_REQUEST="nifty data request";
export const NIFTY_SUCCESS="nifty data success";
export const NIFTY_ERROR="nifty data error";

export class NiftyRequestAction{
    readonly type=NIFTY_REQUEST;
}

export class NiftySuccessAction{
    readonly type=NIFTY_SUCCESS;

    constructor(public payload?:{Data:any[]}){

    }
}
//-------------------------------------

export const NIFTY_PCR_CHART_REQUEST="nifty pcr chart data request";
export const NIFTY_PCR_CHART_SUCCESS="nifty pcr chart data success";

export class NiftyPCRChartRequestAction{
    readonly type=NIFTY_PCR_CHART_REQUEST
}
export class NiftyPCRChartSuccessAction{
    readonly type=NIFTY_PCR_CHART_SUCCESS;
    constructor(public payload?:{PCRData:any[],OIData:any[]}){

    }
}

