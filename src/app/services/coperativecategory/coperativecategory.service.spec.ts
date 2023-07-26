import { TestBed } from '@angular/core/testing';

import { CoperativecategoryService } from './coperativecategory.service';

describe('CoperativecategoryService', () => {
  let service: CoperativecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoperativecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
