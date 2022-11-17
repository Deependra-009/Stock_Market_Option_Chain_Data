import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { from, of, tap, toArray } from 'rxjs';
import { NiftyPCR } from 'src/app/Models/Nifty';
import { NiftyDataServiceService } from 'src/services/NiftyService/nifty-data-service.service';



@Component({
  selector: 'app-nifty-chart',
  templateUrl: './nifty-chart.component.html',
  styleUrls: ['./nifty-chart.component.css']
})
export class NiftyChartComponent implements OnInit {

  loading:Boolean=false;
  loaded:Boolean=false;

  PCRChartData: any = []
  myTitle: any = "Put Call Ratio"
  myType: any = "LineChart"

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

  pcrchartColumns = [
    "Time", "PCR"
  ];

  // call put open interest
  OICallPUTChartData:any=[]
  OITitle: any = "OI Call Put"
  OIType: any = "LineChart"
  OIOptions = {
    colors: ['#e0440e', 'green', 'red', '#f3b49f', '#f6c7b6'],
    is3D: true,
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Open Interest'
    },
    pointSize: 5
  };

  OIchartColumns = [
    "Time", "Call OI","Put OI"
  ];

  


  constructor(
    private niftyService: NiftyDataServiceService
  ) {

  }


  ngOnInit(): void {

    const ObserverNifty$ = this.niftyService.getNiftyData();

    const ncob2$=ObserverNifty$[1];
    const ncob3$ = ObserverNifty$[3];
    const ncob4$=ObserverNifty$[4];
    ncob2$.subscribe((data)=>{this.loaded=data; })
    ncob3$.subscribe((data)=>{this.PCRChartData=data;})
    ncob4$.subscribe((data)=>{this.OICallPUTChartData=data;})

  }


  

}