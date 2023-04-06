import { TestBed } from '@angular/core/testing';

import { MandiusersService } from './mandiusers.service';

describe('MandiusersService', () => {
  let service: MandiusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandiusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
