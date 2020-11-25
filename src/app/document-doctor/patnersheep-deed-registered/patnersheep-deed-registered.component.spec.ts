import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnersheepDeedRegisteredComponent } from './patnersheep-deed-registered.component';

describe('PatnersheepDeedRegisteredComponent', () => {
  let component: PatnersheepDeedRegisteredComponent;
  let fixture: ComponentFixture<PatnersheepDeedRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatnersheepDeedRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatnersheepDeedRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
