import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTaskPage } from './add-task.page';
import { FormComponent } from '../components/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: AddTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTaskPage, FormComponent]
})
export class AddTaskPageModule { }
