import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { Task } from 'src/app/models/task';
import { BaseChartDirective } from 'ng2-charts-x';
import { Subscription } from 'rxjs';

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

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public chartData = [];

  public startTime = new Date().toISOString();
  public endTime = new Date().toISOString();

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  constructor(private sqlDb: SQLdbService) {
    this.task$ = this.sqlDb.tasks.subscribe((data: Task[]) => {
      this.deleteChartData();
      this.taskData = data;
      this.sortTaskByDate();
      this.populateChart();
      this.refreshChart();
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
      // this.barChartData[0].data.push(Number(this.taskData[index].points));
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
    let localDates = [];
    for (let index = 0; index < this.taskData.length; index++) {
      if ((new Date(this.taskData[index].startTime) > new Date(this.startTime)) && (new Date(this.taskData[index].endTime) < new Date(this.endTime))) {
        localDates.push(this.taskData[index].points);
      }
    }

    this.barChartData[0].data = [];
    this.barChartLabels = [];

    localDates.forEach((date) => {
      (this.barChartData[0].data as (number | Chart.ChartPoint)[]).push(date);
      this.barChartLabels.push(``);
    })

    this.refreshChart();
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
