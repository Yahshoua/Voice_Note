import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVoicePage } from './get-voice.page';

describe('GetVoicePage', () => {
  let component: GetVoicePage;
  let fixture: ComponentFixture<GetVoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetVoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetVoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
