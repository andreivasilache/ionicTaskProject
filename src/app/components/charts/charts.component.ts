import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { Task } from 'src/app/models/task';
import { BaseChartDirective } from 'ng2-charts-x';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  private taskData: Task[];
  isDataAvalabile = false;
  task$: Subscription;

  @ViewChild('baseChart') chart: BaseChartDirective;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  chartData = [];

  startTime = new Date().toISOString();
  endTime = new Date().toISOString();

  barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  constructor(private sqlDb: SQLdbService) {
    this.task$ = this.sqlDb.tasks.subscribe((data: Task[]) => {
      this.deleteChartData();
      this.taskData = data;
      this.sortTaskByDate();
      this.populateChart();
      this.refreshChart();
      this.updateChartBetween();
    })
    this.task$
  }

  deleteChartData() {
    this.taskData = [];
    this.barChartData[0].data = [];
  }


  populateChart() {
    this.barChartLabels = [];
    for (let index = 0; index < this.taskData.length; index++) {
      this.barChartLabels.push(``);
      (this.barChartData[0].data as (number | Chart.ChartPoint)[]).push(this.taskData[index].points);
    }
    this.isDataAvalabile = true;
  }

  sortTaskByDate() {
    return this.taskData.sort((a, b) => {
      return <any>new Date(a.startTime) - <any>new Date(b.startTime);
    });
  }

  updateChartBetween() {
    if (moment(this.startTime).valueOf() <= moment(this.endTime).valueOf()) {
      let localDates = [];
      for (let index = 0; index < this.taskData.length; index++) {
        if ((moment(this.taskData[index].startTime).valueOf() >= moment(this.startTime).toDate().setHours(0).valueOf()) && (moment(this.taskData[index].endTime).valueOf() <= moment(this.endTime).toDate().setHours(24).valueOf())) {
          localDates.push(this.taskData[index].points);
        }
        this.barChartData[0].data = [];
        this.barChartLabels = [];

        localDates.forEach((date) => {
          (this.barChartData[0].data as (number | Chart.ChartPoint)[]).push(date);
          this.barChartLabels.push(``);
        })
      }
      this.refreshChart();
    } else {
      alert("Invalid date format!");
      this.startTime = new Date().toISOString();
      this.endTime = new Date().toISOString();
    }
  }




  refreshChart() {
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    this.barChartData = clone;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.task$.unsubscribe()
  }

}
