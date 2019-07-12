import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';

export interface Task {
  id: number,
  title: string,
  startTime: string,
  endTime: string,
  points: number,
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SQLdbService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  tasks = new BehaviorSubject([]);


  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqLite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqLite.create({
        name: "tasks",
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.database.executeSql('SELECT * FROM tasks', []).then((data) => {
          if (data.rows.length > 0) {
            this.loadTasks()
          } else {
            this.seedDatabase();
          }
        })
      })
    })
  }

  seedDatabase() {
    this.sqlitePorter.importSqlToDb(this.database,
      "CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, startTime TEXT , endTime  TEXT, points INTEGER , completed BIT);" +
      "INSERT or IGNORE INTO tasks VALUES (1,'Visit Max','2019-07-12T06:28:16+0000','2019-07-12T06:28:16+0000',10,false)").then(() => {
        this.loadTasks();
        console.log("Data loaded!")
        this.dbReady.next(true);
      })
  }

  loadTasks() {
    return this.database.executeSql('SELECT * FROM tasks', []).then(data => {
      let tasks: Task[] = [];
      if (data.rows.length > 0) {
        for (let index = 0; index < data.rows.length; index++) {
          tasks.push({
            id: data.rows.item(index).id,
            title: data.rows.item(index).title,
            startTime: data.rows.item(index).startTime,
            endTime: data.rows.item(index).endTime,
            completed: data.rows.item(index).completed,
            points: data.rows.item(index).points,
          })
        }
        this.tasks.next(tasks);
      }
    })
  }


  getDataBaseState() {
    return this.dbReady.asObservable();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(title, startTime, endTime, points) {
    let taskData = [title, startTime, endTime, points];
    return this.database.executeSql("INSERT INTO tasks (title,startTime,endTime,points,completed) VALUES (?,?,?,?,false)", taskData).then(data => {
      this.loadTasks();
    })
  }

  deleteTask(id) {
    return this.database.executeSql("DELETE FROM tasks WHERE id = ?", [id]).then(() => {
      this.loadTasks();
    })
  }
  toggleTaskStatus(currentStatus, id) {
    let oppositeNumber;
    if (currentStatus == 0) oppositeNumber = 1;
    if (currentStatus == 1) oppositeNumber = 0;
    return this.database.executeSql("UPDATE tasks SET completed = ? WHERE id = ?", [oppositeNumber, id]).then(() => {
      this.loadTasks();
    })
  }
}
