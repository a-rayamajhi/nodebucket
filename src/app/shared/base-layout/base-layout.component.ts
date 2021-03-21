/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Base Layout component
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  /**
   *
   * @param router Router
   * @param cookieService CookieService
   */
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {}

  /**
   * logOut(): delete session_user cookie and redirect to login page
   */
  logOut() {
    this.cookieService.delete('session_user');
    this.router.navigate(['session/login']);
  }
}
