import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { leaveguardGuard } from './leaveguard.guard';

describe('leaveguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => leaveguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
