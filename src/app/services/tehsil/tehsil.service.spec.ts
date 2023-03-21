import { TestBed } from '@angular/core/testing';

import { TehsilService } from './tehsil.service';

describe('TehsilService', () => {
  let service: TehsilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TehsilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
