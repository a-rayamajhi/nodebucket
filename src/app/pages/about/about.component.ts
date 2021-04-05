/**
 * Title: about.component.ts
 * Author: Professor Krasso
 * Date: 4 Apr 2021
 * Modified By:  Anil Rayamajhi
 * Description: About Component
 */

import { Component, OnInit } from '@angular/core';

/**
 * Component Definition
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  // About component payload
  description: string =
    'nodebucket is built for every member of your software team to plan, track, and release great software.Create user stories and issues, plan sprints, and distribute tasks across your software team. Prioritize and discuss your team’s work in full context with complete visibility. Improve team performance based on visual data that your team can put to use.';

  ngOnInit(): void {}
}
