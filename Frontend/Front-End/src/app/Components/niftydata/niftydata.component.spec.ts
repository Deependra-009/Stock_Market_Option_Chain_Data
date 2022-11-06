import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftydataComponent } from './niftydata.component';

describe('NiftydataComponent', () => {
  let component: NiftydataComponent;
  let fixture: ComponentFixture<NiftydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiftydataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiftydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
