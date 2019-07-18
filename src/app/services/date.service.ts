import { Injectable } from '@angular/core';
import * as moment from 'moment';

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

  checkTodayMatch(startISOInterval, endISOInterval) {
    let start = +new Date(new Date(startISOInterval).setUTCHours(0, 0, 0, 0)); // set value to morning 00:01
    let end = +new Date(new Date(endISOInterval).setUTCHours(24, 0, 0, 0)); // set value to evening 23:59
    let now = +new Date();

    if ((now >= start) && (now <= end)) return true;
  }

  checkThisWeekMatch(startWeekIso, endWeekIso) {
    let now = moment();
    let startIso = moment(startWeekIso);
    let endIso = moment(endWeekIso);

    return ((now.isoWeek() == startIso.isoWeek()) && (now.isoWeek() == endIso.isoWeek()))
  }

  checkThisMonthMatch(startWeekIso, endWeekIso) {
    let now = moment();
    let startIso = moment(startWeekIso);
    let endIso = moment(endWeekIso);

    return ((now.month() == startIso.month()) && (now.month() == endIso.month()))
  }

  constructor() { }
}
