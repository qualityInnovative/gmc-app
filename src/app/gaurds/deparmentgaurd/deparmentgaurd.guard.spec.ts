import { TestBed } from '@angular/core/testing';

import { DeparmentgaurdGuard } from './deparmentgaurd.guard';

describe('DeparmentgaurdGuard', () => {
  let guard: DeparmentgaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeparmentgaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
