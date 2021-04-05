/**
 * Title: task.service.ts
 * Author: Professor Krasso
 * Date: 30 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Task Service with http client service
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from './item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   *
   * @param http HTTPClient Service for making network calls
   */
  constructor(private http: HttpClient) {}

  /**
   *
   * @param empId string employeeId
   * @returns Observable of any type
   */
  findAllTasks(empId: string): Observable<any> {
    return this.http.get(`/api/employees/${empId}/tasks`);
  }

  /**
   *
   * @param empId string employeeId
   * @param task
   * @returns Observable of any type
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post(`/api/employees/${empId}/tasks`, {
      text: task,
    });
  }

  /**
   *
   * @param empId string employeeId
   * @param task
   * @returns Observable of any type
   */
  updateTask(empId: string, todo: IItem[], done: IItem[]): Observable<any> {
    return this.http.put(`/api/employees/${empId}/tasks`, {
      todo,
      done,
    });
  }

  /**
   *
   * @param empId string employeeId
   * @param taskId string taskId
   * @returns Observable of any type
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`);
  }
}
