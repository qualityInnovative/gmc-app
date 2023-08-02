import { TestBed } from '@angular/core/testing';

import { CorporateratesService } from './corporaterates.service';

describe('CorporateratesService', () => {
  let service: CorporateratesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateratesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
