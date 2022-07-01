import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListModule } from './employees-list/employees-list.module';
import { AddEmployeeModule } from './add-employee/add-employee.module';
import { EditEmployeeModule } from './edit-employee/edit-employee.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeesListModule,
    AddEmployeeModule,
    EditEmployeeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
