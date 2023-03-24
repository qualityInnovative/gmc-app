import { TestBed } from '@angular/core/testing';

import { MandicommoditypricingService } from './mandicommoditypricing.service';

describe('MandicommoditypricingService', () => {
  let service: MandicommoditypricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandicommoditypricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
