/**
 * Title: auth.guard.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Auth Guard
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   * @param router Router
   * @param cookieService CookieService
   */
  constructor(private router: Router, private cookieService: CookieService) {}

  /**
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   *
   * Description: Check if session_user cookie exists
   * Redirect to login page is cookies does not exist.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['session/login']);
      return false;
    }
  }
}
