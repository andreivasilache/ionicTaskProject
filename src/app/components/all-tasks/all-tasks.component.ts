import { Component, OnInit, NgModule } from '@angular/core';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { DateService } from 'src/app/services/date.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})

@NgModule({
  declarations: [TaskComponent]
})

export class AllTasksComponent implements OnInit {

  tasks = [];


  constructor(public sqlDb: SQLdbService, public dateService: DateService) {
    this.sqlDb.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  deleteTask(id) {
    this.sqlDb.deleteTask(id);
  }

  toggleTaskStatus(id, currentStatus) {
    this.sqlDb.toggleTaskStatus(currentStatus, id);
  }

  isToday(ISOToBeChecked) {
    return this.dateService.checkTodayMatch(ISOToBeChecked);
  }

  redirectToTaskEdit(id) {
    console.log(id)
  }

  ngOnInit() { }

}
