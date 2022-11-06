import { ChangeDetectorRef, Component } from '@angular/core';
import { FetchServiceService } from 'src/services/fetch-service.service';
import Axios from 'axios';
import { NiftydataComponent } from './Components/niftydata/niftydata.component';
import { BankNiftyComponent } from './Components/bank-nifty/bank-nifty.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
  ){  }

  ngOnInit(): void {
    // this.updateService.automaticCall();
    
  }


  


  


  


}
