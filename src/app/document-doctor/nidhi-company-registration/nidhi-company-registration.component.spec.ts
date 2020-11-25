import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NidhiCompanyRegistrationComponent } from './nidhi-company-registration.component';

describe('NidhiCompanyRegistrationComponent', () => {
  let component: NidhiCompanyRegistrationComponent;
  let fixture: ComponentFixture<NidhiCompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NidhiCompanyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NidhiCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
