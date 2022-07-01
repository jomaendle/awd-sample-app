import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEmployeeComponent } from './edit-employee.component';
import { EmployeeFormModule } from '../employee-form/employee-form.module';

@NgModule({
  declarations: [EditEmployeeComponent],
  imports: [CommonModule, EmployeeFormModule],
})
export class EditEmployeeModule {}
