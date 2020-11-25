import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimittedLiabilityPartnersheepComponent } from './limitted-liability-partnersheep.component';

describe('LimittedLiabilityPartnersheepComponent', () => {
  let component: LimittedLiabilityPartnersheepComponent;
  let fixture: ComponentFixture<LimittedLiabilityPartnersheepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimittedLiabilityPartnersheepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimittedLiabilityPartnersheepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
