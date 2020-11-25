import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdyogAadharComponent } from './udyog-aadhar.component';

describe('UdyogAadharComponent', () => {
  let component: UdyogAadharComponent;
  let fixture: ComponentFixture<UdyogAadharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdyogAadharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdyogAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
