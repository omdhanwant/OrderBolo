import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteValidityComponent } from './caste-validity.component';

describe('CasteValidityComponent', () => {
  let component: CasteValidityComponent;
  let fixture: ComponentFixture<CasteValidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteValidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
