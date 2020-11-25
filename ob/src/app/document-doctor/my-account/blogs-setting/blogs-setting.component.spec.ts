import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsSettingComponent } from './blogs-setting.component';

describe('BlogsSettingComponent', () => {
  let component: BlogsSettingComponent;
  let fixture: ComponentFixture<BlogsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
