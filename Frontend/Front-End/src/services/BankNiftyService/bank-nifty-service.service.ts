import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, delay, Observable, pluck, take } from 'rxjs';
import { BankNiftyRequestAction, BankNiftySuccessAction } from 'src/app/DataHandle/Actions/BankNiftyAction';
import { getBankNiftyData, getBankNiftyLoaded, getBankNiftyLoading, getBankNiftyOIChartData, getBankNiftyPCR, getBankNiftyPCRChartData, RootReducerState } from 'src/app/DataHandle/Reducer';
import { BankNiftyPCR } from 'src/app/Models/BankNifty';
import { FetchServiceService } from '../FetchAPI/fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankNiftyServiceService {

  AllBankNiftyData = new Array<BankNiftyPCR>();
  AllBankNiftyChartPCRData = new Array<any>();
  AllBankNiftyChartOIData = new Array<any>();



  constructor(
    private service: FetchServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void { }

  getBankNiftyData(): [Observable<Boolean>, Observable<Boolean>, Observable<any>, Observable<any>, Observable<any>] {
    const loading$ = this.store.select(getBankNiftyLoading);
    const loaded$ = this.store.select(getBankNiftyLoaded);
    const bankNiftyData = this.store.select(getBankNiftyPCR);
    const bankNiftyChartPCRData = this.store.select(getBankNiftyPCRChartData);
    const bankNiftyChartOIData = this.store.select(getBankNiftyOIChartData);
    return [loading$, loaded$, bankNiftyData, bankNiftyChartPCRData, bankNiftyChartOIData];
  }

  updateBankNiftyAllData(force = false) {


    const loading$ = this.store.select(getBankNiftyLoading);
    const loaded$ = this.store.select(getBankNiftyLoaded);
    const bankNiftyData = this.store.select(getBankNiftyPCR);
    const bankNiftyChartPCRData = this.store.select(getBankNiftyPCRChartData);
    const bankNiftyChartOIData = this.store.select(getBankNiftyOIChartData);

    bankNiftyData.pipe(take(1)).subscribe((data) => this.AllBankNiftyData = data).unsubscribe();
    bankNiftyChartPCRData.pipe(take(1)).subscribe((data) => this.AllBankNiftyChartPCRData = data).unsubscribe();
    bankNiftyChartOIData.pipe(take(1)).subscribe((data) => this.AllBankNiftyChartOIData = data).unsubscribe();

    combineLatest([loading$, loaded$])
      .pipe(
        take(1)
      )
      .subscribe(
        (data) => {
          if ((!data[0] && !data[1]) || force) {
            this.store.dispatch(new BankNiftyRequestAction())
            this.service.getBankNiftyData()
              .pipe(
                pluck('filtered'),

              )
              .subscribe(
                (res: any) => {
                  this.convertData(res);

                },
                (error) => {
                  console.log(error);

                }
              )
          }
        }
      )

  }

  convertData(tempData: any) {

    if (tempData == undefined) return;



    let data = {
      totalCallOI: 0,
      totalCallVolume: 0,
      totalPutOI: 0,
      totalPutVolume: 0,
      PCROI: 1,
      PCRVOLUME: 1,
      time: ""

    }
    data.totalCallOI = tempData.CE.totOI;
    data.totalPutOI = tempData.PE.totOI;
    data.totalCallVolume = tempData.CE.totVol;
    data.totalPutVolume = tempData.PE.totVol;
    data.PCROI = (Number(data.totalPutOI) / Number(data.totalCallOI));
    data.PCRVOLUME = (Number(data.totalPutVolume) / Number(data.totalCallVolume));
    data.time = this.formatAMPM(new Date());


    this.AllBankNiftyData = [...this.AllBankNiftyData, data]
    this.AllBankNiftyChartPCRData = [...this.AllBankNiftyChartPCRData, [data.time, data.PCROI]];
    this.AllBankNiftyChartOIData = [...this.AllBankNiftyChartOIData, [data.time, data.totalCallOI, data.totalPutOI]];



    this.store.dispatch(new BankNiftySuccessAction({ Data: this.AllBankNiftyData, BankNiftyPCRData: this.AllBankNiftyChartPCRData, BankNiftyOIData: this.AllBankNiftyChartOIData }))
  }

  formatAMPM(date: Date) {
    var hours = date.getHours();
    var minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }





}