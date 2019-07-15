import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  @ViewChild(FormComponent) formData: FormComponent;


  constructor() { }

  ngOnInit() {
  }

  submitForm(isInEditMode) {
    this.formData.submitForm(isInEditMode);
  }

}
