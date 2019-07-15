import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLdbService } from '../services/database/sqldb.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  title: string;
  startTime: string;
  endTimeDate: string;
  points: number;
  id: number;
  inited = false;


  constructor(private activatedRoute: ActivatedRoute, private sqlDb: SQLdbService, public router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      this.sqlDb.getTask(+params.id).then((data: Task) => {
        this.title = data.title;
        this.startTime = data.startTime;
        this.endTimeDate = data.endTime;
        this.points = data.points;
        this.id = data.id
        this.inited = true;
      })
    })
  }
  saveEdits() {
    if (this.inited) {
      this.sqlDb.editTask(this.id, this.title, this.startTime, this.endTimeDate, this.points).then((data) => {
        this.router.navigate(['/'])
      })
    }
  }


  ngOnInit() {

  }




}
