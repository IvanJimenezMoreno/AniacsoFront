import { TestBed } from '@angular/core/testing';

import { CookieHandlerService } from './cookie-handler.service';

describe('CookieHandlerServiceService', () => {
  let service: CookieHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
