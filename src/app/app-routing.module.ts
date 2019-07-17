import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CalendarsComponent } from './components/calendar/calendar.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: '',
        component: AllTasksComponent
      },
      {
        path: 'charts',
        component: ChartsComponent
      },
      {
        path: 'calendar',
        component: CalendarsComponent
      }, {
        path: "**",
        component: AllTasksComponent
      }
    ]
  },
  { path: 'add-task', loadChildren: './add-task/add-task.module#AddTaskPageModule' },
  { path: 'edit-task/:id', loadChildren: './edit-task/edit-task.module#EditTaskPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
