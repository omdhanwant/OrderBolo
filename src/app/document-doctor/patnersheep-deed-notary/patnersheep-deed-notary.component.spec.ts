import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatnersheepDeedNotaryComponent } from './patnersheep-deed-notary.component';

describe('PatnersheepDeedNotaryComponent', () => {
  let component: PatnersheepDeedNotaryComponent;
  let fixture: ComponentFixture<PatnersheepDeedNotaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatnersheepDeedNotaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatnersheepDeedNotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
