import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NiftyPCR, NiftyPCRChart } from './../../app/Models/Nifty';
import { combineLatest, delay, Observable, pluck, retry, take } from 'rxjs';
import { NiftyRequestAction, NiftySuccessAction } from 'src/app/DataHandle/Actions/NiftyActions';
import { getNiftyLoaded, getNiftyLoading, getNiftyOIChartData, getNiftyPCR, getNiftyPCRChartData, RootReducerState } from 'src/app/DataHandle/Reducer';
import { FetchServiceService } from '../FetchAPI/fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class NiftyDataServiceService {

  AllNiftyData = new Array<NiftyPCR>();
  AllNiftyChartPCRData = new Array<any>();
  AllNiftyChartOIData = new Array<any>();



  constructor(
    private service: FetchServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void { }

  getNiftyData(): [Observable<Boolean>, Observable<Boolean>, Observable<any>, Observable<any>, Observable<any>] {
    const loading$ = this.store.select(getNiftyLoading);
    const loaded$ = this.store.select(getNiftyLoaded);
    const niftyData = this.store.select(getNiftyPCR);
    const niftyChartPCRData = this.store.select(getNiftyPCRChartData);
    const niftyChartOIData = this.store.select(getNiftyOIChartData);

    return [loading$, loaded$, niftyData, niftyChartPCRData, niftyChartOIData];
  }

  updateNiftyAllData(force = false) {

    const loading$ = this.store.select(getNiftyLoading);
    const loaded$ = this.store.select(getNiftyLoaded);
    const niftyData = this.store.select(getNiftyPCR);
    const niftyChartPCRData = this.store.select(getNiftyPCRChartData);
    const niftyChartOIData = this.store.select(getNiftyOIChartData);

    niftyData.pipe(take(1)).subscribe((data) => this.AllNiftyData = data).unsubscribe();
    niftyChartPCRData.pipe(take(1)).subscribe((data) => this.AllNiftyChartPCRData = data).unsubscribe();
    niftyChartOIData.pipe(take(1)).subscribe((data) => this.AllNiftyChartOIData = data).unsubscribe();


    // console.log(force);

    combineLatest([loading$, loaded$])
      .pipe(
        take(1)
      )
      .subscribe(
        (data) => {
          if ((!data[0] && !data[1]) || force) {
            this.store.dispatch(new NiftyRequestAction())
            this.service.getNiftyData()
              .pipe(
                pluck('filtered')
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
      ).unsubscribe();

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

    this.AllNiftyData = [...this.AllNiftyData, data]
    this.AllNiftyChartPCRData = [...this.AllNiftyChartPCRData, [data.time, data.PCROI]];
    this.AllNiftyChartOIData = [...this.AllNiftyChartOIData, [data.time, data.totalCallOI, data.totalPutOI]];
    // console.log(this.AllNiftyChartPCRData);

    this.store.dispatch(new NiftySuccessAction({ Data: this.AllNiftyData, NiftyPCRData: this.AllNiftyChartPCRData, NiftyOIData: this.AllNiftyChartOIData }))
    // this.store.dispatch(new NiftyPCRChartSuccessAction({NiftyPCRData:this.AllNiftyChartPCRData,NiftyOIData:this.AllNiftyChartOIData}))

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