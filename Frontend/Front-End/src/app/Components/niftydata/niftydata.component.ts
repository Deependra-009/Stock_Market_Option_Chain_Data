import { Component, OnInit } from '@angular/core';
import { NiftyPCR } from 'src/app/Models/Nifty';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';
import { Store } from '@ngrx/store';
import { getNiftyPCR, RootReducerState } from 'src/app/DataHandle/Reducer';
import { delay, interval, take, tap } from 'rxjs';
@Component({
  selector: 'app-niftydata',
  templateUrl: './niftydata.component.html',
  styleUrls: ['./niftydata.component.css']
})
export class NiftydataComponent implements OnInit {

  loading: Boolean = true;
  loaded: Boolean = false;
  Data = new Array<NiftyPCR>();



  constructor(
    private niftyData: NiftyDataServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void {


    const observer$ = this.niftyData.getNiftyData();
    const o1$ = observer$[0];
    const o2$ = observer$[1];
    const o3$ = observer$[2];
    o1$.subscribe((data: Boolean) => this.loading = data);
    o2$.subscribe((data: Boolean) => this.loaded = data);
    o3$.subscribe((data: any) => {
      this.Data = data;
      localStorage.setItem("nifty",data);
    });

  }

  refreshData() {



  }

  getColor(pcr:any){
    return pcr>1?"Green":"Red";
  }



}
