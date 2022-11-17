import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankNiftyComponent } from './Components/bank-nifty/bank-nifty.component';
import { NiftydataComponent } from './Components/niftydata/niftydata.component';

const routes: Routes = [
  {
    path:'',
    component:NiftydataComponent
  },
  {
    path:'bank-nifty',
    component:BankNiftyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
