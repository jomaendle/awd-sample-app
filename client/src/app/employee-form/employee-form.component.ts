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
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({
    name: 'Jo ',
    level: Level.MIDDLE,
    position: 'Frontend Engineer',
  });

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
    this.initialState?.subscribe((employee: Employee) =>
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
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
