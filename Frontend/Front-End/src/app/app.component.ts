import { ChangeDetectorRef, Component } from '@angular/core';
import { FetchServiceService } from 'src/services/fetch-service.service';
import Axios from 'axios';
import { NiftydataComponent } from './Components/niftydata/niftydata.component';
import { BankNiftyComponent } from './Components/bank-nifty/bank-nifty.component';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';
import { BankNiftyServiceService } from 'src/services/BankNiftyService/bank-nifty-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private niftyservice:NiftyDataServiceService,
    private bankNiftyService:BankNiftyServiceService
  ){  }

  ngOnInit(): void {

    this.automaticCall();
    
  }

  automaticCall(){
    setTimeout(()=>{
      this.niftyservice.getData();
      this.bankNiftyService.getData();
      this.automaticCall();
    },(180000))
  }

 


  


  


  


}
