import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getDayMonthAndYear(ISODate) {
    let date = new Date(ISODate);
    let month = date.getMonth();
    let day = date.getDay();
    let year = date.getFullYear()
    return {
      day, month, year
    }
  }

  checkTodayMatch(ISOtoBeChecked) {
    let todayDate = new Date();
    let todayDayAndMonth = this.getDayMonthAndYear(todayDate);
    let dateToBeChecked = this.getDayMonthAndYear(ISOtoBeChecked);

    return todayDayAndMonth.day === dateToBeChecked.day
      && todayDayAndMonth.month === dateToBeChecked.month
      && todayDayAndMonth.year === dateToBeChecked.year;
  }


  constructor() { }
}
