import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchServiceService } from 'src/services/fetch-service.service';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';

@Component({
  selector: 'app-niftydata',
  templateUrl: './niftydata.component.html',
  styleUrls: ['./niftydata.component.css']
})
export class NiftydataComponent implements OnInit {

  loading: boolean = false
  loaded: boolean = false
  Data=new Array()


  constructor(
    private niftyservice:NiftyDataServiceService
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
    console.log("hello nifty data");
    this.Data=this.niftyservice.getNiftyData();
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
