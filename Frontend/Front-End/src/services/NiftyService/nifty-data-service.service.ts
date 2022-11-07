import { Injectable } from '@angular/core';
import { FetchServiceService } from '../fetch-service.service';

@Injectable({
  providedIn: 'root'
})
export class NiftyDataServiceService {

  Data=new Array()

  totalpechange = 0;
  totalcechange = 0;

  nifty_data: any = []

  constructor(
    private service: FetchServiceService
  ) { }

  ngOnInit(): void {

    const data=localStorage.getItem("nifty-data");
    if(data!=null){
      this.Data=JSON.parse(data);
    }
   
  }

  //getter

  getNiftyData(){
    return this.Data;
  }

  getData(){

    this.service.getNiftyData().subscribe(
      (data: any) => {
        if(data==null){
          return;
        }
        this.nifty_data = data.filtered.data;
        // console.log(((data.filtered.CE.totOI)+"  "+(data.filtered.PE.totOI)));
        // console.log(data);
        

        setTimeout(()=>{
          this.updateData();
          const curr_date=this.formatAMPM(new Date());
          this.Data.push({
            CEOI:this.totalcechange,
            PEOI:this.totalpechange,
            PCR:((data.filtered.PE.totOI)/(data.filtered.CE.totOI)),
            Time:curr_date
          })
          this.Data.reverse();
          localStorage.setItem("nifty-data",JSON.stringify(this.Data));
          this.totalcechange=0;
          this.totalpechange=0;
          // console.log('====================================');
          console.log(this.Data);
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