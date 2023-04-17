import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { BankNiftyServiceService } from 'src/services/BankNiftyService/bank-nifty-service.service';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private niftyData: NiftyDataServiceService,
    private bankNiftyData: BankNiftyServiceService
  ) { }

  ngOnInit(): void {

    const UpdateData=interval(10000);
    UpdateData.subscribe((data)=>{
      this.getData();
    })


  }

  getData() {
    this.niftyData.updateNiftyAllData(true);
    // this.bankNiftyData.updateBankNiftyAllData(true);
  }















}
