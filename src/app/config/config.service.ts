import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../icustomer';
const url = "http://localhost:8080/home";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  customerList: Array<ICustomer> = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(url);
  }

  create(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(url, customer);
  }

  edit(id: number, customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(url + "/" + id, customer);
  }

  delete(id: number): Observable<ICustomer> {
    return this.http.delete<ICustomer>(url + "/" + id);
  }

  findById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(url + "/" + id);
  }
}
