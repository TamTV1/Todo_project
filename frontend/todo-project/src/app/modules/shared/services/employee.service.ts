import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpClient,
} from '@angular/common/http';
import { API_SERVICE } from '@app/app.constant';

@Injectable()
export class EmployeeService {

    public readonly employeeUrl = `${API_SERVICE.API_URL}/employee`;

    constructor(protected httpClient: HttpClient) {
    }

    public getEmployee(params: any): Observable<any> {
        return this.httpClient.get<any>(`${this.employeeUrl}/filterList`, { params: params });
    }

    public getDetailEmployee(params: any): Observable<any> {
        return this.httpClient.get<any>(`${this.employeeUrl}/detail`, { params: { id: params } });
    }

    public saveEmployee(params: any): Observable<any> {
        return this.httpClient.post<any>(`${this.employeeUrl}/save`, params);
    }
}