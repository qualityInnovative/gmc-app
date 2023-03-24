import { TestBed } from '@angular/core/testing';

import { DistrictrateconfigService } from './districtrateconfig.service';

describe('DistrictrateconfigService', () => {
  let service: DistrictrateconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictrateconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
