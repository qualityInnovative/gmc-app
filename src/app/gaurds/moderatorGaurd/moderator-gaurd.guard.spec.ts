import { TestBed } from '@angular/core/testing';

import { ModeratorGaurdGuard } from './moderator-gaurd.guard';

describe('ModeratorGaurdGuard', () => {
  let guard: ModeratorGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModeratorGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
