import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTaskPage } from './add-task.page';
import { FormComponent } from '../components/form/form.component';
import { FormModule } from '../components/form/form.module';

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
    RouterModule.forChild(routes),
    FormModule
  ],
  declarations: [AddTaskPage]
})
export class AddTaskPageModule { }
