import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPage } from './add-task.page';

describe('AddTaskPage', () => {
  let component: AddTaskPage;
  let fixture: ComponentFixture<AddTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
