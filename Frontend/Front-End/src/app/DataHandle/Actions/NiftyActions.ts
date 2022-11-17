export const NIFTY_REQUEST="nifty data request";
export const NIFTY_SUCCESS="nifty data success";
export const NIFTY_ERROR="nifty data error";

export class NiftyRequestAction{
    readonly type=NIFTY_REQUEST;
}

export class NiftySuccessAction{
    readonly type=NIFTY_SUCCESS;

    constructor(public payload?:{Data:any[],NiftyPCRData:any[],NiftyOIData:any[]}){

    }
}
//-------------------------------------



