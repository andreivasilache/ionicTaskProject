import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditTaskPage } from './edit-task.page';
import { FormModule } from '../components/form/form.module';


const routes: Routes = [
  {
    path: '',
    component: EditTaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormModule
  ],
  declarations: [EditTaskPage]
})
export class EditTaskPageModule { }
