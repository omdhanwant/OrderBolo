import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfComponent } from './pf.component';

describe('PfComponent', () => {
  let component: PfComponent;
  let fixture: ComponentFixture<PfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
