import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankNiftyChartComponent } from './bank-nifty-chart.component';

describe('BankNiftyChartComponent', () => {
  let component: BankNiftyChartComponent;
  let fixture: ComponentFixture<BankNiftyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankNiftyChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankNiftyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
