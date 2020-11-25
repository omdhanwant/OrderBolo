import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePersonCompanyComponent } from './one-person-company.component';

describe('OnePersonCompanyComponent', () => {
  let component: OnePersonCompanyComponent;
  let fixture: ComponentFixture<OnePersonCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePersonCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePersonCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
