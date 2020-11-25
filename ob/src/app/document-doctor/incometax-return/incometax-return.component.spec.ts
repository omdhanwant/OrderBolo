import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncometaxReturnComponent } from './incometax-return.component';

describe('IncometaxReturnComponent', () => {
  let component: IncometaxReturnComponent;
  let fixture: ComponentFixture<IncometaxReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncometaxReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncometaxReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
