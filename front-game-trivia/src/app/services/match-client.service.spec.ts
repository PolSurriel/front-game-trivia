import { TestBed } from '@angular/core/testing';

import { MatchClientService } from './match-client.service';

describe('MatchClientService', () => {
  let service: MatchClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
