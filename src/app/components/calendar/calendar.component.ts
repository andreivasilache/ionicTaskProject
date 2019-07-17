import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { CalendarComponent } from "ionic2-calendar/calendar";
import { Task } from 'src/app/models/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarsComponent implements OnInit, OnDestroy {
  @ViewChild(CalendarComponent) Calendar: CalendarComponent;
  selectedDay = new Date()
  task$: Subscription;

  selectedObject = {
    title: null,
    startTime: null,
    endTime: null
  }
  eventSource = []
  viewTitle;
  isToday: boolean;
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]

  calendar = {
    mode: this.calendarModes[1].key,
    currentDate: new Date()
  }; // these are the variable used by the calendar.


  constructor(public navCtrl: NavController,
    private sqlDb: SQLdbService
  ) { }


  ngOnInit() {
    this.task$ = this.sqlDb.tasks.subscribe((data: Task[]) => {
      this.eventSource = [];

      data.forEach((task) => {
        this.blockDayEvent(task.startTime, task.endTime, task.title);
      })
      this.Calendar.loadEvents();
    })
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  blockDayEvent(localStartTime, localEndTime, localTitle) {
    let startTimeISO = new Date(localStartTime);
    startTimeISO.setUTCHours(0, 0, 0, 0); // last midnight
    let endTimeISO = new Date(localEndTime);
    endTimeISO.setUTCHours(24, 0, 0, 0); // next midnight
    let startTime = new Date(Date.UTC(startTimeISO.getUTCFullYear(), startTimeISO.getUTCMonth(), startTimeISO.getUTCDate()));
    let endTime = new Date(Date.UTC(endTimeISO.getUTCFullYear(), endTimeISO.getUTCMonth(), endTimeISO.getUTCDate()));

    let events = {
      title: localTitle,
      startTime: startTime,
      endTime: endTime,
      allDay: true
    }
    this.eventSource.push(events)
  }

  onEventSelected(event) {
    this.selectedObject.title = event.title;

    this.selectedObject.startTime = event.startTime;

    let localDateEnd = new Date(event.endTime);
    localDateEnd.setDate(localDateEnd.getDate() - 1);
    this.selectedObject.endTime = localDateEnd;
  }



  ngOnDestroy() {
    this.task$.unsubscribe();
  }



}
