import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }


  getAll(): Observable<Employee[]>{
    return this.http.get(`${this.baseUrl}/employees/noe_cruz`)
      .pipe(map((dat:any)=>dat.data.employees));
    
  }

  add(employee:Employee):Observable<any>{
    return this.http.post(`${this.baseUrl}/employees/noe_cruz`,employee);
  }

}
