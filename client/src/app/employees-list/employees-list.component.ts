import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent implements OnInit {
  employees$: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(private _employeesService: EmployeeService) {}

  ngOnInit(): void {
    this._fetchEmployees();
  }

  deleteEmployee(id: string): void {
    this._employeesService.deleteEmployee(id);
  }

  private _fetchEmployees(): void {
    this.employees$ = this._employeesService.getEmployees();
  }
}
