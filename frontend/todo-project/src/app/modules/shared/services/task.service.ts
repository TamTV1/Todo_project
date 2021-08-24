import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_SERVICE } from '@app/app.constant';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {

    public readonly taskUrl = `${API_SERVICE.API_URL}/task`;

    constructor(protected httpClient: HttpClient) {
    }

    public getTaskByUser(params: any): Observable<any> {
        return this.httpClient.get<any>(`${this.taskUrl}/listByUser`, { params: { employeeId: params } });
    }
}