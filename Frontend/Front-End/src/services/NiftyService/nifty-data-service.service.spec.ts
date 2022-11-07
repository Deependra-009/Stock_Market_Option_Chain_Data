import { TestBed } from '@angular/core/testing';

import { NiftyDataServiceService } from './nifty-data-service.service';

describe('NiftyDataServiceService', () => {
  let service: NiftyDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiftyDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
