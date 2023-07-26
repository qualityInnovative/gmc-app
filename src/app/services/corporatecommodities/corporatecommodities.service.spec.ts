import { TestBed } from '@angular/core/testing';

import { CorporatecommoditiesService } from './corporatecommodities.service';

describe('CorporatecommoditiesService', () => {
  let service: CorporatecommoditiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporatecommoditiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
