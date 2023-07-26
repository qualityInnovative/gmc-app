import { TestBed } from '@angular/core/testing';

import { CorporationdiscountfactorService } from './corporationdiscountfactor.service';

describe('CorporationdiscountfactorService', () => {
  let service: CorporationdiscountfactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporationdiscountfactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
