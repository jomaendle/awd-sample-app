import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Employee, Level } from '../employee';
import { ReplaySubject, Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @Input()
  set initialState(employee: Employee | null) {
    if (employee) {
      this._initialState.next(employee);
    }
  }

  @Output()
  formValueChanged = new EventEmitter<Employee>();

  @Output()
  formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
  });

  private _destroy$: Subject<void> = new Subject<void>();
  private _initialState: ReplaySubject<Employee> = new ReplaySubject<Employee>();

  constructor() {}

  get levelType(): typeof Level {
    return Level;
  }

  get name(): AbstractControl | null {
    return this.employeeForm.get('name');
  }

  get position(): AbstractControl | null {
    return this.employeeForm.get('position');
  }

  get level(): AbstractControl | null {
    return this.employeeForm.get('level');
  }

  ngOnInit(): void {
    this._initialState.subscribe((employee: Employee) =>
      this.employeeForm.patchValue({
        name: employee.name,
        position: employee.position,
        level: employee.level,
      })
    );

    this.employeeForm.valueChanges.subscribe((employee: Employee) =>
      this.formValueChanged.emit(employee)
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  submitForm(): void {
    console.log(this.employeeForm.value);
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
