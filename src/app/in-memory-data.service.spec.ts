import { TestBed, inject } from '@angular/core/testing';

import { CONTESTS } from './contest.exampledata';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService]
    });
  });

  it('should return the example contests',
    inject([InMemoryDataService], (service: InMemoryDataService) => {
    expect(service.createDb()['contests']).toEqual(CONTESTS);
  }));
});
