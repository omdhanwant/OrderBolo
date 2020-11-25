import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanCardComponent } from './pan-card.component';

describe('PanCardComponent', () => {
  let component: PanCardComponent;
  let fixture: ComponentFixture<PanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
