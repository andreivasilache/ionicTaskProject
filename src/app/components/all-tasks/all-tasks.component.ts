import { Component, OnInit } from '@angular/core';
import { SQLdbService } from 'src/app/services/database/sqldb.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {

  tasks = [];

  constructor(public sqlDb: SQLdbService) {
    this.sqlDb.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  deleteTask(id) {
    this.sqlDb.deleteTask(id);
  }

  editTask(id, currentStatus) {
    this.sqlDb.toggleTaskStatus(currentStatus, id);
  }

  ngOnInit() { }

}
