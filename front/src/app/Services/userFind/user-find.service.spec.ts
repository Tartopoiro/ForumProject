import { TestBed } from '@angular/core/testing';

import { UserFindService } from './user-find.service';

describe('UserFindService', () => {
  let service: UserFindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
