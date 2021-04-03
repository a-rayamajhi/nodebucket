/**
 * Title: create-task-dialog.component.ts
 * Author: Professor Krasso
 * Date: 3 Apr 2021
 * Modified By:  Anil Rayamajhi
 * Description: Task Dialog for creating new task.
 * The component includes a dialog with a form
 * to input task and essential validators.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css'],
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  /**
   *
   * @param dialogRef MatDialogRef to close with or without form value
   * @param fb FormBuilder to declare field name and validators
   */
  constructor(
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * Close dialogRef with taskForm values
   */
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  /**
   * Close dialogRef
   */
  cancel() {
    this.dialogRef.close();
  }
}
