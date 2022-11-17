import { TestBed } from '@angular/core/testing';

import { BankNiftyServiceService } from './bank-nifty-service.service';

describe('BankNiftyServiceService', () => {
  let service: BankNiftyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankNiftyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
