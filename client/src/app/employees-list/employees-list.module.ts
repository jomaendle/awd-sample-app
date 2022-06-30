import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EmployeesListComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [EmployeesListComponent],
})
export class EmployeesListModule {}
