import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Creating controls for loginForm
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

  login() {
    // Accessing 'empId' from loginForm controls created in ngOnInit()
    const empId = this.loginForm.controls['empId'].value;

    this.http.get(`/api/employees/${empId}`).subscribe((res) => {
      /**
       * try to access anonymous Object key using bracket notation, for example: res
       *
       * anonymous Object are those with no type definition, else create interface for res
       */
      if (res['data']) {
        this.cookieService.set('session_user', empId, 1);
      } else {
        this.errorMessage = res['message'];
      }
    });
  }
}
