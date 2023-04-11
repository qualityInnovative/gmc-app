import { TestBed } from '@angular/core/testing';

import { DeparmentretailrateService } from './deparmentretailrate.service';

describe('DeparmentretailrateService', () => {
  let service: DeparmentretailrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeparmentretailrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
