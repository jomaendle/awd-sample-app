import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnDestroy {
  private _BASE_URL: string = 'http://localhost:5200/.netlify/functions/server/employees';
  private _employees: Subject<Employee[]> = new Subject<Employee[]>();
  private _destroy$: Subject<void> = new Subject<void>();

  headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  constructor(private _httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getEmployee(id: string): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._BASE_URL}/${id}`);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this._httpClient.post(`${this._BASE_URL}`, employee, {
      responseType: 'text',
    });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    console.log(employee);
    return this._httpClient.put(`${this._BASE_URL}/${id}`, employee, {
      responseType: 'text',
    });
  }

  deleteEmployee(id: string): Observable<string> {
    return this._httpClient.delete(`${this._BASE_URL}/${id}`, {
      responseType: 'text',
    });
  }

  getEmployees(): Observable<Employee[]> {
    this._refreshEmployees();
    return this._employees.asObservable();
  }

  private _refreshEmployees(): void {
    this._httpClient
      .get<Employee[]>(`${this._BASE_URL}`)
      .pipe(takeUntil(this._destroy$))
      .subscribe((employees) => this._employees.next(employees));
  }
}
