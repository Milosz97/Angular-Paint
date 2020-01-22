import { TestBed } from '@angular/core/testing';

import { CircleService } from './circle.service';

describe('CircleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircleService = TestBed.get(CircleService);
    expect(service).toBeTruthy();
  });
});
