/**
 * Title: about.component.ts
 * Author: Professor Krasso
 * Date: 10 Jan 2021
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
  artist: string  = 'Bob Dylan';
  description: string = `Dylan's vision of American popular music was transformative. No one set the
  bar higher, or had greater impact. "You want to write songs that are bigger
  than life," he wrote in his memoir, Chronicles. "You want to say something
  about strange things that have happened to you, strange things you have
  seen."`;
  profilePicture: string = 'http://cdn.rollingstone.com/feature/100-best-song-writers/images/dylan-bob-lead-505.jpg';

  ngOnInit(): void {}
}
