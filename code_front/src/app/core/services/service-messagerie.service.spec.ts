import { TestBed } from '@angular/core/testing';

import { ServiceMessagerieService } from './service-messagerie.service';

describe('ServiceMessagerieService', () => {
  let service: ServiceMessagerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMessagerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
