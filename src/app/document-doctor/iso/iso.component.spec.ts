import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsoComponent } from './iso.component';

describe('IsoComponent', () => {
  let component: IsoComponent;
  let fixture: ComponentFixture<IsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
