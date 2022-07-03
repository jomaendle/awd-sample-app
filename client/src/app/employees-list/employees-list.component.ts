import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent implements OnInit {
  employees$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(private _employeesService: EmployeeService, private _router: Router) {}

  ngOnInit(): void {
    this._fetchEmployees();
  }

  deleteEmployee(id: string): void {
    this._employeesService.deleteEmployee(id).subscribe(() => {
      this._fetchEmployees();
    });
  }

  editEmployee(id: string): void {
    this._router.navigate(['/employees', 'edit', id]);
  }

  private _fetchEmployees(): void {
    this.employees$ = this._employeesService.getEmployees();
  }
}
