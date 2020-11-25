import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegistrationComponent } from './vendor-registration.component';

describe('VendorRegistrationComponent', () => {
  let component: VendorRegistrationComponent;
  let fixture: ComponentFixture<VendorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
