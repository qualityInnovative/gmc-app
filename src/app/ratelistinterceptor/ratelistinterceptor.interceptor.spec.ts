import { TestBed } from '@angular/core/testing';

import { RatelistinterceptorInterceptor } from './ratelistinterceptor.interceptor';

describe('RatelistinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RatelistinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RatelistinterceptorInterceptor = TestBed.inject(RatelistinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
