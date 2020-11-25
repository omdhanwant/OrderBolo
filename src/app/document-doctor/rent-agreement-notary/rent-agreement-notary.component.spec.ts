import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAgreementNotaryComponent } from './rent-agreement-notary.component';

describe('RentAgreementNotaryComponent', () => {
  let component: RentAgreementNotaryComponent;
  let fixture: ComponentFixture<RentAgreementNotaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentAgreementNotaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAgreementNotaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
