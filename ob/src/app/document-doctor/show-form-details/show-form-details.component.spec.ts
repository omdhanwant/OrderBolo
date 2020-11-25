import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFormDetailsComponent } from './show-form-details.component';

describe('ShowFormDetailsComponent', () => {
  let component: ShowFormDetailsComponent;
  let fixture: ComponentFixture<ShowFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFormDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
