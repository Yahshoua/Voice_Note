import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomePage } from './modal-home.page';

describe('ModalHomePage', () => {
  let component: ModalHomePage;
  let fixture: ComponentFixture<ModalHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
