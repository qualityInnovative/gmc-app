import { TestBed } from '@angular/core/testing';

import { MandicommoditiesService } from './mandicommodities.service';

describe('MandicommoditiesService', () => {
  let service: MandicommoditiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandicommoditiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
