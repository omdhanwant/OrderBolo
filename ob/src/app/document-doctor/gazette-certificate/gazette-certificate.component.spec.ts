import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GazetteCertificateComponent } from './gazette-certificate.component';

describe('GazetteCertificateComponent', () => {
  let component: GazetteCertificateComponent;
  let fixture: ComponentFixture<GazetteCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GazetteCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazetteCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
