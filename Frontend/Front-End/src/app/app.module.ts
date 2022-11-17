import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NiftydataComponent } from './Components/niftydata/niftydata.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BankNiftyComponent } from './Components/bank-nifty/bank-nifty.component';
import { NiftyChartComponent } from './Components/nifty-chart/nifty-chart.component';
import { rootReducer } from './DataHandle/Reducer';
import { NgApexchartsModule } from "ng-apexcharts";
import { GoogleChartsModule } from 'angular-google-charts';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    NiftydataComponent,
    NavbarComponent,
    BankNiftyComponent,
    NiftyChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    NgApexchartsModule,
    GoogleChartsModule,
    StoreModule.forRoot(rootReducer, {})
    
    
  ],
  providers: [NiftydataComponent,BankNiftyComponent,NiftyChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
