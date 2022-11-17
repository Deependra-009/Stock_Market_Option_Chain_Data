import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankNiftyComponent } from './bank-nifty.component';

describe('BankNiftyComponent', () => {
  let component: BankNiftyComponent;
  let fixture: ComponentFixture<BankNiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankNiftyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankNiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
