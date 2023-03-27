import { TestBed } from '@angular/core/testing';

import { RetailratelistService } from './retailratelist.service';

describe('RetailratelistService', () => {
  let service: RetailratelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailratelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
