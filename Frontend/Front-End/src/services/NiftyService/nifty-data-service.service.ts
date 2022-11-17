import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NiftyPCR } from './../../app/Models/Nifty';
import { combineLatest, delay, Observable, pluck, retry, take } from 'rxjs';
import { NiftyRequestAction, NiftySuccessAction } from 'src/app/DataHandle/Actions/NiftyActions';
import { getNiftyLoaded, getNiftyLoading, getNiftyPCR, RootReducerState } from 'src/app/DataHandle/Reducer';
import { FetchServiceService } from '../FetchAPI/fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class NiftyDataServiceService {

  AllNiftyData = new Array<NiftyPCR>();



  constructor(
    private service: FetchServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void { }

  getNiftyData():[Observable<Boolean>,Observable<Boolean>,Observable<any>]{
    const loading$ = this.store.select(getNiftyLoading);
    const loaded$ = this.store.select(getNiftyLoaded);
    const niftyData=this.store.select(getNiftyPCR);
    return [loading$,loaded$,niftyData];
  }

  updateNiftyAllData(force=false){

    const loading$ = this.store.select(getNiftyLoading);
    const loaded$ = this.store.select(getNiftyLoaded);
    const niftyData=this.store.select(getNiftyPCR);
    niftyData.pipe(
      take(1)
    ).subscribe((data)=>{
      this.AllNiftyData=data;
    })
    console.log(force);
    
    combineLatest([loading$, loaded$])
    .pipe(
      take(1)
    )
    .subscribe(
      (data) => {
        if ((!data[0] && !data[1] )|| force) {
          this.store.dispatch(new NiftyRequestAction())
          this.service.getNiftyData()
            .pipe(
              pluck('filtered')
            )
            .subscribe(
              (res: any) => {
                console.log(res);
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
    
    // console.log(tempData);
    
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
    this.AllNiftyData=[...this.AllNiftyData,data]
    // console.log(this.AllNiftyData);

    this.store.dispatch(new NiftySuccessAction({Data:this.AllNiftyData}))

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