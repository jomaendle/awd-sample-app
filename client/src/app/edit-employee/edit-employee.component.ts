import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, switchMap, take } from 'rxjs';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeeComponent implements OnInit {
  employee$: ReplaySubject<Employee> = new ReplaySubject<Employee>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _employeesService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this._employeesService.getEmployee(id!).subscribe((employee) => {
      this.employee$.next(employee);
    });
  }

  onEmployeeChanged(changedEmployee: Employee): void {
    this.employee$
      .pipe(
        take(1),
        switchMap((employee: Employee) => {
          return this._employeesService.updateEmployee(employee._id || '', changedEmployee);
        })
      )
      .subscribe(() => {
        this._router.navigate(['/employees']);
      });
  }
}
