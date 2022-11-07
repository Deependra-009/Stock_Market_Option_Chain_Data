import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BankNiftyServiceService } from 'src/services/BankNiftyService/bank-nifty-service.service';
import { FetchServiceService } from 'src/services/fetch-service.service';

@Component({
  selector: 'app-bank-nifty',
  templateUrl: './bank-nifty.component.html',
  styleUrls: ['./bank-nifty.component.css']
})
export class BankNiftyComponent implements OnInit {

  loading: boolean = false
  loaded: boolean = false
  Data=new Array()


  constructor(
    private banknifty:BankNiftyServiceService
  ) { }

  ngOnInit(): void {
    this.automaticCall();
    this.setData();
  }

  automaticCall(){
    setTimeout(()=>{
      this.loading=true;
      this.loaded=false;
      setTimeout(()=>{
        this.setData();
      },3000);
      this.automaticCall();
    },(180000))
  }

  setData(){
    console.log("hello bank nifty data");
    this.Data=this.banknifty.getBankNiftyData();
    this.loading=false;
    this.loaded=true;
  }

  getColor(pcr:any){
    return pcr>1?"Green":"Red";
  }

  refreshData() {
    this.setData();
  }

  

}
