import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/DataHandle/Reducer';
import { BankNiftyPCR } from 'src/app/Models/BankNifty';
import { BankNiftyServiceService } from 'src/services/BankNiftyService/bank-nifty-service.service';
// import { FetchServiceService } from 'src/services/fetch-service.service';

@Component({
  selector: 'app-bank-nifty',
  templateUrl: './bank-nifty.component.html',
  styleUrls: ['./bank-nifty.component.css']
})
export class BankNiftyComponent implements OnInit {

  loading: Boolean = true;
  loaded: Boolean = false;
  Data = new Array<BankNiftyPCR>();



  constructor(
    private bankNiftyData: BankNiftyServiceService,
    private store: Store<RootReducerState>
  ) { }

  ngOnInit(): void {


    const observer$ = this.bankNiftyData.getBankNiftyData();
    const o1$ = observer$[0];
    const o2$ = observer$[1];
    const o3$ = observer$[2];
    o1$.subscribe((data: Boolean) => this.loading = data);
    o2$.subscribe((data: Boolean) => this.loaded = data);
    o3$.subscribe((data: any) => this.Data = data);

  }

  refreshData() {



  }

  getColor(pcr:any){
    return pcr>1?"Green":"Red";
  }



}
