import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Employee} from "./employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _BASE_URL: string = "http://localhost:5200";
  private _employees: Subject<Employee[]> = new Subject<Employee[]>();

  constructor() { }
}
