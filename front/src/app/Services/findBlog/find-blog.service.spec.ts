import { TestBed } from '@angular/core/testing';

import { FindBlogService } from './find-blog.service';

describe('FindBlogService', () => {
  let service: FindBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
