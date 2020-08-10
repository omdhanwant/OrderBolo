import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodLicienceComponent } from './food-licience.component';

describe('FoodLicienceComponent', () => {
  let component: FoodLicienceComponent;
  let fixture: ComponentFixture<FoodLicienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodLicienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodLicienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
