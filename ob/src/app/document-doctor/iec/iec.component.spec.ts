import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IecComponent } from './iec.component';

describe('IecComponent', () => {
  let component: IecComponent;
  let fixture: ComponentFixture<IecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
