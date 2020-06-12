import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { GroupsComponent } from './components/groups/groups.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { SearchPipe } from './pipes/search-pipe.pipe';
import {NgDragDropModule} from 'ng-drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    GroupsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    DatePipe,
    SearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
