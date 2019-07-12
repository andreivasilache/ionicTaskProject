import { TestBed } from '@angular/core/testing';

import { SQLdbService } from './sqldb.service';

describe('SQLdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SQLdbService = TestBed.get(SQLdbService);
    expect(service).toBeTruthy();
  });
});
