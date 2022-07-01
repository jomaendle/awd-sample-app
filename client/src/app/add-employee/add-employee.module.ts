import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee.component';
import { EmployeeFormModule } from '../employee-form/employee-form.module';

@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [CommonModule, EmployeeFormModule],
})
export class AddEmployeeModule {}
