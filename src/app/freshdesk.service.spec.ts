import { TestBed } from '@angular/core/testing';

import { FreshdeskService } from './freshdesk.service';

describe('FreshdeskService', () => {
  let service: FreshdeskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreshdeskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
