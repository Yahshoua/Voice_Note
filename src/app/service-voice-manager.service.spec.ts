import { TestBed } from '@angular/core/testing';

import { ServiceVoiceManagerService } from './service-voice-manager.service';

describe('ServiceVoiceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceVoiceManagerService = TestBed.get(ServiceVoiceManagerService);
    expect(service).toBeTruthy();
  });
});
