import { TestBed } from '@angular/core/testing';

import { EnrollmentAndRatingService } from './enrollment-and-rating.service';

describe('EnrollmentAndRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollmentAndRatingService = TestBed.get(EnrollmentAndRatingService);
    expect(service).toBeTruthy();
  });
});
