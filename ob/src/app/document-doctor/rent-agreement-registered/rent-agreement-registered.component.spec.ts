import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAgreementRegisteredComponent } from './rent-agreement-registered.component';

describe('RentAgreementRegisteredComponent', () => {
  let component: RentAgreementRegisteredComponent;
  let fixture: ComponentFixture<RentAgreementRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentAgreementRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAgreementRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
