/**
 * Title: login.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Login component
 */

import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

/**
 * Test Interface to understand anonymous Object for http response
 * Refer to login method in LoginComponent
 */
// interface IBaseResponse{
//   httpCode: string;
//   message: string;
//   data: Object;
//   timestamp: string
// }
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  /**
   *
   * @param fb FormBuilder
   * @param router Router
   * @param cookieService CookieService
   * @param http HttpClient
   * @param snackBar MatSnackBar
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /**
     * Build loginForm with Controls
     * validators: required numeric field
     */
    this.loginForm = this.fb.group({
      empId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }

  /**
   * login(): API call to get employee that matches user inputted empId
   * Navigation logic based on response data featuring snackbar to show response
   */
  login() {
    // Accessing 'empId' from loginForm controls created in ngOnInit()
    const empId = this.loginForm.controls['empId'].value;

    this.http.get(`/api/employees/${empId}`).subscribe((res) => {
      console.log(empId);
      /**
       * try to access anonymous Object key using bracket notation, for example: res
       *
       * anonymous Object are those with no type definition, else create interface for res
       */
      if (res['data']) {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      } else if (!res['data'] && res['httpCode'] === 200) {
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      } else {
        this.openSnackBar(res['message'], 'ERROR');
      }
    });
  }

  /**
   *
   * @param message string
   * @param notificationType string
   *
   * launch snackbar method
   */
  openSnackBar(message: string, notificationType: string): void {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
