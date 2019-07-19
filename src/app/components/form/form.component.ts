import { Component, OnInit, Input } from '@angular/core';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  text: string;
  startTime: string = new Date().toISOString();
  endTimeDate: string = new Date().toISOString();
  points: number;
  id: number;



  @Input() IsEditMode: boolean;
  @Input() InputText: string;
  @Input() DateStart: string;
  @Input() DateEnd: string;
  @Input() Points: number;
  @Input() Id: number;

  constructor(public sqlDB: SQLdbService, private router: Router) {

    setTimeout(() => {
      if (this.IsEditMode) {
        this.text = this.InputText;
        this.startTime = this.DateStart;
        this.endTimeDate = this.DateEnd;
        this.points = this.Points;
        this.id = this.Id;
      }
    }, 1000)
  }



  ngOnInit() { }

  submitForm() {
    if ((this.text && this.points) && (moment(this.startTime).valueOf() <= moment(this.endTimeDate).valueOf())) {
      if (!this.IsEditMode) {
        this.sqlDB.addTask(this.text, this.startTime, this.endTimeDate, this.points).then(() => {
          this.router.navigate(['home/']);
        })
      } else {
        this.sqlDB.editTask(this.id, this.text, this.startTime, this.endTimeDate, this.points).then(() => {
          this.router.navigate(['home/']);
        })
      }
    } else {
      alert("Invalid input values! Please check again!");
    }
  }

}
