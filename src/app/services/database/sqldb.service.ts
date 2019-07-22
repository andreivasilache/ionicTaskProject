import "reflect-metadata";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';


import PouchDB from "pouchdb";
import PouchdbFind from 'pouchdb-find';

@Injectable({
  providedIn: 'root'
})

export class SQLdbService {
  dbConnection;
  tasks = new BehaviorSubject([]);


  constructor(private plt: Platform) {
    PouchDB.plugin(PouchdbFind);
    this.dbConnection = new PouchDB('tasks');

    this.plt.ready().then(() => { this.loadTasks() });
  }


  loadTasks() {
    this.dbConnection.allDocs({ include_docs: true }).then((docs: any) => {
      let tasks = [];
      for (let index = 0; index < docs.rows.length; index++) {
        tasks.push({
          id: docs.rows[index].id,
          title: docs.rows[index].doc.title,
          startTime: docs.rows[index].doc.startTime,
          endTime: docs.rows[index].doc.endTime,
          completed: docs.rows[index].doc.completed,
          points: docs.rows[index].doc.points,
        })
      }
      this.tasks.next(tasks);
    })
  }


  getTasks(): Observable<any> {
    return this.tasks.asObservable();
  }

  getTask(id): Promise<any> {
    return this.dbConnection.find({ selector: { _id: id } }).then((data: any) => {
      return {
        id: id,
        title: data.docs[0].title,
        startTime: data.docs[0].startTime,
        endTime: data.docs[0].endTime,
        completed: data.docs[0].completed,
        points: data.docs[0].points,
      };
    })
  }

  addTask(title, startTime, endTime, points) {
    let taskData = { title, startTime, endTime, points, completed: false };
    return this.dbConnection.post(taskData).then(() => {
      this.loadTasks();
    })
  }

  editTask(id, title, startTime, endTime, points) {
    // return this.database.executeSql("UPDATE tasks SET title = ?, startTime = ? , endTime = ?, points = ? WHERE id = ?", [title, startTime, endTime, points, id]).then((data) => {
    //   this.loadTasks();
    // })
  }

  deleteTask(id) {
    // return this.database.executeSql("DELETE FROM tasks WHERE id = ?", [id]).then(() => {
    //   this.loadTasks();
    // })
  }
  toggleTaskStatus(currentStatus, id) {
    let oppositeNumber;
    if (currentStatus == 0) oppositeNumber = 1;
    if (currentStatus == 1) oppositeNumber = 0;
    // return this.database.executeSql("UPDATE tasks SET completed = ? WHERE id = ?", [oppositeNumber, id]).then(() => {
    //   this.loadTasks();
    // })
  }
}
