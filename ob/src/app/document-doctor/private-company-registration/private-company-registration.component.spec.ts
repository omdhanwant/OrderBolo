import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCompanyRegistrationComponent } from './private-company-registration.component';

describe('PrivateCompanyRegistrationComponent', () => {
  let component: PrivateCompanyRegistrationComponent;
  let fixture: ComponentFixture<PrivateCompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCompanyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
