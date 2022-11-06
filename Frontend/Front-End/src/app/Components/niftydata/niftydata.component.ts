import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from 'src/services/fetch-service.service';

@Component({
  selector: 'app-niftydata',
  templateUrl: './niftydata.component.html',
  styleUrls: ['./niftydata.component.css']
})
export class NiftydataComponent implements OnInit {

  loading: boolean = false
  loaded: boolean = false
  progressBarValue=0

  nifty_data: any = []
  totalpechange = 0;
  totalcechange = 0;

  Data=new Array()


  constructor(
    private service: FetchServiceService,
    // private updatedata:UpdateDataService
  ) { }

  ngOnInit(): void {
    const data=localStorage.getItem("nifty-data");
    if(data!=null){
      this.Data=JSON.parse(data);
      this.loading=false;
      this.loaded=true;
      // console.log(this.Data);
    }
  }

  getColor(pcr:any){
    return pcr>0?"Green":"Red";
  }

  getData() {
    this.loading=true;
    this.loaded=false;

    this.service.getNiftyData().subscribe(
      (data: any) => {
        if(data==null){
          this.loading=false;
          this.loaded=false;
          return;
        }
        this.nifty_data = data.filtered.data;
        // console.log(this.nifty_data);

        setTimeout(()=>{
          this.updateData();
          const curr_date=this.formatAMPM(new Date());
          this.Data.push({
            CEOI:this.totalcechange,
            PEOI:this.totalpechange,
            PCR:(this.totalcechange/this.totalpechange),
            Time:curr_date
          })
          this.Data.reverse();
          localStorage.setItem("nifty-data",JSON.stringify(this.Data));
          this.totalcechange=0;
          this.totalpechange=0;
          this.loading=false;
          this.loaded=true;
          // this.updatedata.automaticCall();
          // console.log('====================================');
          // console.log(this.Data);
          // console.log('====================================');
        },3000)

      },
      (error) => {
        console.log(error);

      }
    )
  }

  updateData() {

    for (let c of this.nifty_data) {
      this.checkCE(c);
      this.checkPE(c);
    }

  }

  checkCE(data: any) {
    if (data.CE == null) {
      return;
    }
    this.totalcechange += data.CE.changeinOpenInterest;
    
    // return data.CE.changeinOpenInterest;


  }

  checkPE(data: any) {
    // this.CE.push(Number(data.PE.changeinOpenInterest));
    this.totalpechange += data.PE.changeinOpenInterest;
    // return data.PE.changeinOpenInterest;
  }

  formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  

}
