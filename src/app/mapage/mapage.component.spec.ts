import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapageComponent } from './mapage.component';

describe('MapageComponent', () => {
  let component: MapageComponent;
  let fixture: ComponentFixture<MapageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
