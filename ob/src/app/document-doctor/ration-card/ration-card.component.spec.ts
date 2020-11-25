import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationCardComponent } from './ration-card.component';

describe('RationCardComponent', () => {
  let component: RationCardComponent;
  let fixture: ComponentFixture<RationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
