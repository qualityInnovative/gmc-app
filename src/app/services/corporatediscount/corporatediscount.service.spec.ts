import { TestBed } from '@angular/core/testing';

import { CorporatediscountService } from './corporatediscount.service';

describe('CorporatediscountService', () => {
  let service: CorporatediscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporatediscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
