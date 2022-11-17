import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';



@Component({
  selector: 'app-nifty-chart',
  templateUrl: './nifty-chart.component.html',
  styleUrls: ['./nifty-chart.component.css']
})
export class NiftyChartComponent implements OnInit {

  pcrData = new Array();
  cepeData = new Array();

  myTitle: any = "Put Call Ratio"
  myType: any = "LineChart"

  myPcrChart: any = [];
  myCEPEChart: any = [];



  constructor(
    private niftyService: NiftyDataServiceService
  ) {
  }

  ngOnInit(): void {
    
  }

  setChartData() {
    // this.myPcrChart = this.niftyService.pcrData;
    // this.myCEPEChart = this.niftyService.cepeData;
      console.log(this.myPcrChart, "-");
  }

  myOptions = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true,
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'PCR'
    },
    pointSize: 5
  };

  myCEPEOptions = {
    colors: ['red', 'green', "black"],
    is3D: true,
    hAxis: {
      title: 'Put Open Interest'
    },
    vAxis: {
      title: 'Call Open Interest'
    },
    pointSize: 5
  };

  pcrchartColumns = [
    "Time", "PCR"
  ];

  peoichartColumns = [
    "Time", "PE", "CE"
  ];


}