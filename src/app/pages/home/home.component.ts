/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 31 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Home component
 */

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { IEmployee } from 'src/app/shared/employee.interface';
import { IItem } from 'src/app/shared/item.interface';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todo: IItem[];
  done: IItem[];
  employee: IEmployee;

  empId: string;

  /**
   *
   * @param taskService TaskService
   * @param cookieService CookieService
   * @param dialog MatDialog
   *
   * Description: Network call to retrieve all tasks by employee Id
   */
  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = cookieService.get('session_user');
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log('--Server response from findAllTasks--', res);

        this.employee = res.data;
        console.log('--Employee object--', this.employee);
      },
      (err) => console.log('Err: ', err),
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        console.log('This is in the complete section');
        console.log('Todo: ', this.todo);
        console.log('Done: ', this.done);
      }
    );
  }

  ngOnInit(): void {}

  /**
   * Description: Method to handle dialog open event
   * and subscribe to invoke taskService
   * createTask method after Close action.
   */
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(
          (res) => {
            this.employee = res.data;
          },
          (err) => console.log('Err: ', err),
          () => {
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }

  /**
   *
   * @param event CdkDragDrop Drag and Drop task.
   *
   * Description: Drag and Drop task to reorder or to move
   * from todo container to done container or vice versa.
   */
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Reordered item in an existing column/array');
      this.updateTaskList(this.empId, this.todo, this.done);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Moved task item in a different column/array');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  /**
   *
   * @param taskId string
   *
   * @returns Employee | null
   * Description: Delete task by Task Id
   */
  deleteTask(taskId: string): void {
    if (taskId) {
      console.log(`Task item ${taskId} was deleted`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(
        (res) => {
          this.employee = res.data;
        },
        (err) => console.log('Err: ', err),
        () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        }
      );
    }
  }

  /**
   *
   * @param empId string
   * @param todo IItem Array
   * @param done IItem Array
   *
   * @returns Employee | null
   * Description: Update task list
   */
  private updateTaskList(empId: string, todo: IItem[], done: IItem[]) {
    this.taskService.updateTask(empId, todo, done).subscribe(
      (res) => {
        this.employee = res.data;
      },
      (err) => console.log('Err: ', err),
      () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    );
  }
}
