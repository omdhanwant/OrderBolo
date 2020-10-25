import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsDashboardComponent } from './metrics-dashboard.component';

describe('MetricsDashboardComponent', () => {
  let component: MetricsDashboardComponent;
  let fixture: ComponentFixture<MetricsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
