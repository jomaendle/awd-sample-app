import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListModule } from './employees-list/employees-list.module';
import { EmployeeFormModule } from './employee-form/employee-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, EmployeesListModule, EmployeeFormModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
