import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedDocumentsComponent } from './requested-documents.component';

describe('RequestedDocumentsComponent', () => {
  let component: RequestedDocumentsComponent;
  let fixture: ComponentFixture<RequestedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
