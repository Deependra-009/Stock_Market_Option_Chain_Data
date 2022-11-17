import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, pluck, take } from 'rxjs';
import { BankNiftyRequestAction, BankNiftySuccessAction } from 'src/app/DataHandle/Actions/BankNiftyAction';
import { getBankNiftyData, getBankNiftyLoaded, getBankNiftyLoading, getBankNiftyPCR, RootReducerState } from 'src/app/DataHandle/Reducer';
import { BankNiftyPCR } from 'src/app/Models/BankNifty';
import { FetchServiceService } from '../FetchAPI/fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankNiftyServiceService {

  AllBankNiftyData = new Array<BankNiftyPCR>();



  constructor(
    private service: FetchServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void { }

  getBankNiftyData():[Observable<Boolean>,Observable<Boolean>,Observable<any>]{
    const loading$ = this.store.select(getBankNiftyLoading);
    const loaded$ = this.store.select(getBankNiftyLoaded);
    const bankNiftyData=this.store.select(getBankNiftyPCR);
    return [loading$,loaded$,bankNiftyData];
  }

  updateBankNiftyAllData(force=false){


    const loading$ = this.store.select(getBankNiftyLoading);
    const loaded$ = this.store.select(getBankNiftyLoaded);
    const bankNiftyData=this.store.select(getBankNiftyPCR);
    bankNiftyData.pipe(
      take(1)
    ).subscribe((data)=>{
      this.AllBankNiftyData=data;
    })
    // console.log(force);
    
    combineLatest([loading$, loaded$])
    .pipe(
      take(1)
    )
    .subscribe(
      (data) => {
        if ((!data[0] && !data[1] )|| force) {
          this.store.dispatch(new BankNiftyRequestAction())
          this.service.getBankNiftyData()
            .pipe(
              pluck('filtered')
            )
            .subscribe(
              (res: any) => {
                // console.log(res);
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
    
    if(tempData==undefined) return;
    
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

    // console.log(data);
    // console.log(data);
    this.AllBankNiftyData=[...this.AllBankNiftyData,data]
    // console.log(this.AllNiftyData);

    this.store.dispatch(new BankNiftySuccessAction({Data:this.AllBankNiftyData}))

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