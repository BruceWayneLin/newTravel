import { TestBed, inject } from '@angular/core/testing';

import { RentalCarServiceService } from './rental-car-service.service';

describe('RentalCarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentalCarServiceService]
    });
  });

  it('should be created', inject([RentalCarServiceService], (service: RentalCarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
