import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

  submitForm(isInEditMode) {
    if (!isInEditMode) {
      console.log(this.text, this.startTime, this.endTimeDate, this.points)
    }
  }

}
