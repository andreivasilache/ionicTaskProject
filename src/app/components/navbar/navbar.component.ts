import { Component, OnInit, OnDestroy } from '@angular/core';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { DateService } from 'src/app/services/date.service';
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  task$: Subscription;
  tasks: Task[] = [];
  totalOfTodayPoints = 0;;
  totalOfThisWeekPoints = 0;
  totalOfThisMonthPoints = 0;

  constructor(private sqlDb: SQLdbService, private dateService: DateService) {
    this.task$ = this.sqlDb.tasks.subscribe((data: Task[]) => {
      this.tasks = data;
      this.totalOfTodayPoints = 0;
      this.calculatePoints(data);
    })
  }

  calculatePoints(tasks: Task[]) {
    this.calculateTodayTotalOfPoints(tasks);
    this.calculateThisWeekTotalOfPoints(tasks);
    this.calculateThisMonthTotalOfPoints(tasks)
  }


  toggleTaskStatus(id, taskCompleted) {
    this.sqlDb.toggleTaskStatus(taskCompleted, id);
  }
  deleteTask(id) {
    this.sqlDb.deleteTask(id);
  }

  calculateTodayTotalOfPoints(tasks: Task[]) {
    let localPoints = 0;
    tasks.forEach((task) => {
      if (this.dateService.checkTodayMatch(task.startTime, task.endTime) && task.completed)
        localPoints += task.points
    })
    this.totalOfTodayPoints = localPoints;
  }

  calculateThisWeekTotalOfPoints(tasks: Task[]) {
    let localPoints = 0;
    tasks.forEach((task) => {
      if (this.dateService.checkThisWeekMatch(task.startTime, task.endTime) && task.completed) localPoints += task.points;
    })
    this.totalOfThisWeekPoints = localPoints;
  }

  calculateThisMonthTotalOfPoints(tasks: Task[]) {
    let localPoints = 0;
    tasks.forEach((task) => {
      if (this.dateService.checkThisMonthMatch(task.startTime, task.endTime) && task.completed) localPoints += task.points;
    })
    this.totalOfThisMonthPoints = localPoints;
  }

  isToday(startISOInterval, endISOInterval) {
    if (this.dateService.checkTodayMatch(startISOInterval, endISOInterval)) return true;
  }


  ngOnInit() { }

  ngOnDestroy() {
    this.task$.unsubscribe();
  }

}
