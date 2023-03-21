import { TestBed } from '@angular/core/testing';

import { RatelistService } from './ratelist.service';

describe('RatelistService', () => {
  let service: RatelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
