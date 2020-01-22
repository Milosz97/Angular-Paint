import { TestBed } from '@angular/core/testing';

import { TriangleService } from './triangle.service';

describe('TriangleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TriangleService = TestBed.get(TriangleService);
    expect(service).toBeTruthy();
  });
});
