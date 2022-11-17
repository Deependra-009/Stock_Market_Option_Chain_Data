import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor(
    private http:HttpClient
  ) { }

  getNiftyData(){
    return this.http.get("http://localhost:8090/getNiftyData");
  }
  getBankNiftyData(){
    return this.http.get("http://localhost:8090/getBankNiftyData");
  }
}
