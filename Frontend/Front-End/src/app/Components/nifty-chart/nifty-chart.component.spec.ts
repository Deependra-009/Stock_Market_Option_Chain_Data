import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftyChartComponent } from './nifty-chart.component';

describe('NiftyChartComponent', () => {
  let component: NiftyChartComponent;
  let fixture: ComponentFixture<NiftyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiftyChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiftyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
