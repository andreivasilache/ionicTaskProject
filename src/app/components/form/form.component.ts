import { Component, OnInit, Input } from '@angular/core';
import { SQLdbService } from 'src/app/services/database/sqldb.service';
import { Router } from '@angular/router';

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



  @Input() IsEditMode: boolean;
  @Input() InputText: string;
  @Input() DateStart: string;
  @Input() DateEnd: string;
  @Input() Points: string;

  constructor(public sqlDB: SQLdbService, private router: Router) { }

  ngOnInit() { }

  submitForm(isInEditMode) {
    if (!isInEditMode) {
      this.sqlDB.addTask(this.text, this.startTime, this.endTimeDate, this.points).then(() => {
        this.router.navigate(['home/']);
      })
    }
  }

}
