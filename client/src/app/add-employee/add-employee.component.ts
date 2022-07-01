import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
  constructor(private _employeesService: EmployeeService, private _router: Router) {}

  ngOnInit(): void {}

  addEmployee(employee: Employee): void {
    this._employeesService.createEmployee(employee).subscribe(() => {
      this._router.navigate(['/employees']);
    });
  }
}
