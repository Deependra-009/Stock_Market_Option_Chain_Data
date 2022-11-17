export const BANKNIFTY_REQUEST="bank nifty data request";
export const BANKNIFTY_SUCCESS="bank nifty data success";
export const BANKNIFTY_ERROR="bank nifty data error";

export class BankNiftyRequestAction{
    readonly type=BANKNIFTY_REQUEST;
}

export class BankNiftySuccessAction{
    readonly type=BANKNIFTY_SUCCESS;

    constructor(public payload?:{Data:any[]}){

    }
}