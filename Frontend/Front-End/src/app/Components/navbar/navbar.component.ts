import { Component, OnInit } from '@angular/core';
import { NiftydataComponent } from '../niftydata/niftydata.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }
  resetData(){
    localStorage.removeItem("nifty-data");
    localStorage.removeItem("bank-nifty-data");
    location.href="/"
  }
  

}
