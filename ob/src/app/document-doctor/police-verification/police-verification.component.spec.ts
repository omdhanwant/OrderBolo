import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceVerificationComponent } from './police-verification.component';

describe('PoliceVerificationComponent', () => {
  let component: PoliceVerificationComponent;
  let fixture: ComponentFixture<PoliceVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
