import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from "src/app/environments/environment"
import {Employee} from "./models/employee";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private  apiServerUrl = environment.apiBaseUrl

  constructor(private http:HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  } 
  
  public addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }
  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/`+ employeeId);
  }
 
}
