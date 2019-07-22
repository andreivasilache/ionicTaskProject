import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CalendarsComponent } from './components/calendar/calendar.component';
import { HomePage } from './home/home.page';
import { ChartsModule } from 'ng2-charts-x';
import { NgCalendarModule } from 'ionic2-calendar';
import { NavbarComponent } from './components/navbar/navbar.component';
import "reflect-metadata";

@NgModule({
  declarations: [AppComponent, AllTasksComponent, ChartsComponent, HomePage, CalendarsComponent, NavbarComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgCalendarModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLitePorter,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
