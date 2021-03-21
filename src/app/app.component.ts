/**
 * Title: app.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By:  Anil Rayamajhi
 * Description: Base App Component
 */

import { Component } from '@angular/core';

/**
 * Component definition with router outlet directive template
 */
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {}
