import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DscComponent } from './dsc.component';

describe('DscComponent', () => {
  let component: DscComponent;
  let fixture: ComponentFixture<DscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
