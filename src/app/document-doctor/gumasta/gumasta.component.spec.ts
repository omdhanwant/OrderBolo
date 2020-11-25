import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GumastaComponent } from './gumasta.component';

describe('GumastaComponent', () => {
  let component: GumastaComponent;
  let fixture: ComponentFixture<GumastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GumastaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GumastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
